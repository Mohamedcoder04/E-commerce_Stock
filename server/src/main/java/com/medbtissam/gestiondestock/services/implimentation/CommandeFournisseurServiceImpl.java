package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.*;
import com.medbtissam.gestiondestock.model.*;
import com.medbtissam.gestiondestock.repositories.CommandeFournisseurRepository;
import com.medbtissam.gestiondestock.repositories.FournisseurRepository;
import com.medbtissam.gestiondestock.repositories.LigneCommandeFournisseurRepository;
import com.medbtissam.gestiondestock.repositories.ProductRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.CommandeFournisseurService;
import com.medbtissam.gestiondestock.services.MvtStkService;
import com.medbtissam.gestiondestock.validator.CommandeFournisseurValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommandeFournisseurServiceImpl implements CommandeFournisseurService {
    private FournisseurRepository fournisseurRepository;
    private LigneCommandeFournisseurRepository ligneCommandeFournisseurRepository;
    private ProductRepository productRepository;
    private CommandeFournisseurRepository commandeFournisseurRepository;
    private MvtStkService mvtStkService;

    @Autowired
    public CommandeFournisseurServiceImpl(FournisseurRepository fournisseurRepository,
                                          LigneCommandeFournisseurRepository ligneCommandeFournisseurRepository,
                                          ProductRepository productRepository, CommandeFournisseurRepository commandeFournisseurRepository, MvtStkService mvtStkService) {
        this.fournisseurRepository = fournisseurRepository;
        this.ligneCommandeFournisseurRepository = ligneCommandeFournisseurRepository;
        this.productRepository = productRepository;
        this.commandeFournisseurRepository = commandeFournisseurRepository;
        this.mvtStkService = mvtStkService;
    }

    @Override
    public CommandeFournisseurDto save(CommandeFournisseurDto dto) {

        List<String> errors = CommandeFournisseurValidator.validate(dto);

        if (!errors.isEmpty()) {
            log.error("Commande fournisseur n'est pas valide");
            throw new InvalidEntityException("La commande fournisseur n'est pas valide", ErrorCodes.COMMANDE_FOURNISSEUR_NOT_VALID, errors);
        }

        if (dto.getId() != null && dto.isCommandeLivree()) {
            throw new InvalidOperationException("Impossible de modifier la commande lorsqu'elle est livree", ErrorCodes.COMMANDE_FOURNISSEUR_NON_MODIFIABLE);
        }

        Optional<Fournisseur> fournisseur = fournisseurRepository.findById(dto.getFournisseur().getId());
        if (fournisseur.isEmpty()) {
            log.warn("Fournisseur with ID {} was not found in the DB", dto.getFournisseur().getId());
            throw new EntityNotFoundException("Aucun fournisseur avec l'ID" + dto.getFournisseur().getId() + " n'a ete trouve dans la BDD",
                    ErrorCodes.FOURNISSEUR_NOT_FOUND);
        }

        List<String> articleErrors = new ArrayList<>();

        if (dto.getLigneCommandeFournisseurs() != null) {
            dto.getLigneCommandeFournisseurs().forEach(ligCmdFrs -> {
                if (ligCmdFrs.getProductDto() != null) {
                    Optional<Product> article = productRepository.findById(ligCmdFrs.getProductDto().getId());
                    if (article.isEmpty()) {
                        articleErrors.add("L'article avec l'ID " + ligCmdFrs.getProductDto().getId() + " n'existe pas");
                    }
                } else {
                    articleErrors.add("Impossible d'enregister une commande avec un aticle NULL");
                }
            });
        }

        if (!articleErrors.isEmpty()) {
            log.warn("");
            throw new InvalidEntityException("Article n'existe pas dans la BDD", ErrorCodes.ARTICLE_NOT_FOUND, articleErrors);
        }
        dto.setDateCommande(Instant.now());
        CommandeFournisseur savedCmdFrs = commandeFournisseurRepository.save(CommandeFournisseurDto.toCommandeFournisseur(dto));

        if (dto.getLigneCommandeFournisseurs() != null) {
            dto.getLigneCommandeFournisseurs().forEach(ligCmdFrs -> {
                LigneCommandeFournisseur ligneCommandeFournisseur = LigneCommandeFournisseurDto.toLigneCommandeFournisseur(ligCmdFrs);
                ligneCommandeFournisseur.setCommandeFournisseur(savedCmdFrs);
                LigneCommandeFournisseur saveLigne = ligneCommandeFournisseurRepository.save(ligneCommandeFournisseur);

                effectuerEntree(saveLigne);
            });
        }

        return CommandeFournisseurDto.fromCommandeFournisseur(savedCmdFrs);
    }


    @Override
    public CommandeFournisseurDto findById(Integer id) {
        if (id == null) {
            log.error("");
        }
        //Optional<CommandeFournisseur> commandeFournisseur = commandeFournisseurRepository.findById(id);

        //return CommandeFournisseurDto.fromCommandeFournisseur(commandeFournisseur.get());
        return commandeFournisseurRepository.findById(id).
                map(CommandeFournisseurDto::fromCommandeFournisseur)
                .orElseThrow(
                        () -> new EntityNotFoundException("aucune commande fournisseur n'a été trouvé", ErrorCodes.COMMANDE_FOURNISSEUR_NOT_FOUND)
                );
    }

    @Override
    public CommandeFournisseurDto findByReference(String reference) {
        if (!StringUtils.hasLength(reference)) {
            log.error("");
            throw new InvalidEntityException("" + reference, ErrorCodes.COMMANDE_FOURNISSEUR_NOT_VALID);
        }
        Optional<CommandeFournisseur> commandeFournisseur = commandeFournisseurRepository.findByCode(reference);
        return Optional.of(CommandeFournisseurDto.fromCommandeFournisseur(commandeFournisseur.get())).
                orElseThrow(() -> new EntityNotFoundException("aucune commande fournisseur n'a été trouvé", ErrorCodes.COMMANDE_FOURNISSEUR_NOT_FOUND));
    }

    @Override
    public List<CommandeFournisseurDto> findAll() {
        return commandeFournisseurRepository.findAllByOrderByIdDesc().stream()
                .map(CommandeFournisseurDto::fromCommandeFournisseur)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("");
        }
        List<LigneCommandeFournisseur> ligneCommandeFournisseurs = ligneCommandeFournisseurRepository.findAllByCommandeFournisseurId(id);
        if (!ligneCommandeFournisseurs.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer une commande fournisseur déja utiliser dans des lignecommandefournisseurs", ErrorCodes.COMMANDE_FOURNISSEUR__ALREADY_USE);
        }
        commandeFournisseurRepository.deleteById(id);
    }

    @Override
    public CommandeFournisseurDto updateQuantity(Integer idCommandeFournisseur, Integer idLigneCommandeFournisseur, BigDecimal quantite) {

        CommandeFournisseurDto commandeFournisseurDto = checkEtatCommandeFournisseur(idCommandeFournisseur);
        LigneCommandeFournisseur ligneCommandeFournisseur = checkIdLigneCommandeFournisseur(idLigneCommandeFournisseur);
        if (quantite == null || quantite.compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidOperationException("Impossible de modifier la quantité avec une quantité NULL", ErrorCodes.COMMANDE_FOURNISSEUR_NON_MODIFIABLE);
        }
        ligneCommandeFournisseur.setQuantite(quantite);
        ligneCommandeFournisseurRepository.save(ligneCommandeFournisseur);
        return commandeFournisseurDto;
    }

    @Override
    public CommandeFournisseurDto updateFournisseur(Integer idCommandeFournisseur, Integer idFournisseur) {
        CommandeFournisseurDto commandeFournisseurDto = checkEtatCommandeFournisseur(idCommandeFournisseur);
        Fournisseur fournisseur = checkIdFournisseur(idFournisseur);
        commandeFournisseurDto.setFournisseur(FournisseurDto.fromFournisseur(fournisseur));
        return commandeFournisseurDto;
    }

    @Override
    public CommandeFournisseurDto updateArticle(Integer idCommandeFournisseur, Integer idLigneCommandeFournisseur, Integer idArticle) {
        CommandeFournisseurDto commandeFournisseurDto = checkEtatCommandeFournisseur(idCommandeFournisseur);
        LigneCommandeFournisseur ligneCommandeFournisseur = checkIdLigneCommandeFournisseur(idLigneCommandeFournisseur);
        Product product = checkIdArticle(idArticle);
        ligneCommandeFournisseur.setProduct(product);
        ligneCommandeFournisseurRepository.save(ligneCommandeFournisseur);
        return commandeFournisseurDto;
    }

    @Override
    public List<LigneCommandeFournisseurDto> findAllLigneCommande(Integer idCommandeFournisseur) {
        return ligneCommandeFournisseurRepository.findAllByCommandeFournisseurId(idCommandeFournisseur).stream()
                .map(LigneCommandeFournisseurDto::fromLigneCommandeFournisseur)
                .collect(Collectors.toList());
    }

    @Override
    public CommandeFournisseurDto deleteArticle(Integer idCommandeFournisseur, Integer idLigneCommandeFournisseur) {
        CommandeFournisseurDto commandeFournisseurDto = checkEtatCommandeFournisseur(idCommandeFournisseur);
        ligneCommandeFournisseurRepository.deleteById(idLigneCommandeFournisseur);
        checkIdLigneCommandeFournisseur(idLigneCommandeFournisseur);
        return commandeFournisseurDto;
    }

    @Override
    public CommandeFournisseurDto updateEtatCommandeFournisseur(Integer idCommandeFournisseur, EtatCommande etatCommande) {
        if (!StringUtils.hasLength(String.valueOf(etatCommande))) {
            throw new InvalidOperationException("Vous ne pouvez pas modifier l'état de la commande fournisseur avec un etat null"
                    , ErrorCodes.COMMANDE_FOURNISSEUR_NON_MODIFIABLE);
        }
        CommandeFournisseurDto commandeFournisseurDto = checkEtatCommandeFournisseur(idCommandeFournisseur);
        commandeFournisseurDto.setEtatCommande(etatCommande);
        if (commandeFournisseurDto.isCommandeLivree()) {
            updateMvtStk(idCommandeFournisseur);
        }
        return commandeFournisseurDto;
    }

    private CommandeFournisseurDto checkEtatCommandeFournisseur(Integer id) {
        CommandeFournisseurDto commandeFournisseurDto = findById(id);
        if (commandeFournisseurDto.isCommandeLivree()) {
            throw new InvalidOperationException("Impossible de modifier une commande fournisseur livrée");
        }
        return commandeFournisseurDto;
    }

    private LigneCommandeFournisseur checkIdLigneCommandeFournisseur(Integer id) {
        if (id == null) {
            throw new InvalidOperationException("Impossible de modifier la quantite d'une commande avec un ID null de la Ligne de commande fournisseur ");
        }
        LigneCommandeFournisseur ligneCommandeFournisseur = ligneCommandeFournisseurRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("aucune ligne commande fournisseur avec l'Id" + id + "n'a été trouvé",
                        ErrorCodes.LIGNE_COMMANDE_FOURNISSEUR_NOT_FOUND)
        );

        return ligneCommandeFournisseur;
    }

    private Fournisseur checkIdFournisseur(Integer id) {
        if (id == null) {
            throw new InvalidOperationException("Impossible de modifier une commande fournisseur avec un id fournisseur NULL", ErrorCodes.COMMANDE_FOURNISSEUR_NON_MODIFIABLE);
        }
        return fournisseurRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("", ErrorCodes.FOURNISSEUR_NOT_FOUND)
        );
    }

    private Product checkIdArticle(Integer id) {
        if (id == null) {
            throw new InvalidOperationException("Impossible de modifier l'article d'une commande fournisseur avec un article ID NULL", ErrorCodes.COMMANDE_FOURNISSEUR_NON_MODIFIABLE);
        }
        Product product = productRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("aucun article avec l'ID" + id + " n'a été trouvé", ErrorCodes.ARTICLE_NOT_FOUND)
        );

        return product;
    }

    private void updateMvtStk(Integer idCommande) {
        List<LigneCommandeFournisseur> ligneCommandeFournisseur = ligneCommandeFournisseurRepository.findAllByCommandeFournisseurId(idCommande);
        ligneCommandeFournisseur.forEach(lig -> {
            effectuerEntree(lig);
        });
    }

    private void effectuerEntree(LigneCommandeFournisseur lig) {
        MvtStkDto mvtStkDto = MvtStkDto.builder()
                .productDto(ProductDto.fromProduct(lig.getProduct()))
                .dateMvt(Instant.now())
                .typeMvt(TypeMvt.ENTREE)
                .sourceMvtStk(SourceMvtStk.COMMANDT_FOURNISSEUR)
                .quantite(lig.getQuantite())
                .build();
        mvtStkService.entreeStock(mvtStkDto);
    }

}
