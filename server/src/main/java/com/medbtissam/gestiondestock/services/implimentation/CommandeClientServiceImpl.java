package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.*;
import com.medbtissam.gestiondestock.model.*;
import com.medbtissam.gestiondestock.repositories.*;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.CommandeClientService;
import com.medbtissam.gestiondestock.services.MvtStkService;
import com.medbtissam.gestiondestock.services.ProductService;
import com.medbtissam.gestiondestock.services.UtilisateurService;
import com.medbtissam.gestiondestock.validator.ArticleValidator;
import com.medbtissam.gestiondestock.validator.CommandeClientValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommandeClientServiceImpl implements CommandeClientService {

    private CommandeClientRepository commandeClientRepository;
    private LigneCommandeClientRepository ligneCommandeClientRepository;
    private ClientRepository clientRepository;
    private ProductRepository productRepository;
    private MvtStkService mvtStkService;
    private UtilisateurRepository utilisateurRepository;
    private UtilisateurService utilisateurService;
    private ProductService productService;

    @Autowired
    public CommandeClientServiceImpl(CommandeClientRepository commandeClientRepository,
                                     ClientRepository clientRepository, ProductRepository productRepository, LigneCommandeClientRepository ligneCommandeClientRepository,
                                     MvtStkService mvtStkService, UtilisateurService utilisateurService, ProductService productService) {
        this.commandeClientRepository = commandeClientRepository;
        this.ligneCommandeClientRepository = ligneCommandeClientRepository;
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.mvtStkService = mvtStkService;
        this.utilisateurService = utilisateurService;
        this.productService = productService;
    }

    @Override
    public Integer getAllOrdersCount(Integer id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("aucun utilisateur n'a été trouvé avec l'id " + id, ErrorCodes.UTILISATEUR_NOT_FOUND));
        return commandeClientRepository.countAllByUtilisateur(utilisateur).get();
    }

    @Override
    public CommandeClientDto save(CommandeClientDto dto) {

        List<String> errors = CommandeClientValidator.validate(dto);

        if (!errors.isEmpty()) {
            log.error("Commande client n'est pas valide");
            throw new InvalidEntityException("La commande client n'est pas valide", ErrorCodes.COMMANDE_CLEINT_NOT_VALID, errors);
        }

        if (dto.getId() != null && dto.isCommandeLivree()) {
            throw new InvalidOperationException("Impossible de modifier la commande lorsqu'elle est livrée", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }

        UtilisateurDto utilisateurDto = utilisateurService.findById(dto.getUtilisateurDto().getId());

        //Utilisateur utilisateur = utilisateurRepository.findById(dto.getUtilisateurDto().getId()).get();

        if (utilisateurDto == null) {
            log.warn("User with ID {} was not found in the DB", dto.getUtilisateurDto().getId());
            throw new EntityNotFoundException("Aucun utilisateur avec l'ID" + dto.getUtilisateurDto().getId() + " n'a ete trouve dans la BDD",
                    ErrorCodes.UTILISATEUR_NOT_FOUND);
        }

        List<String> articleErrors = new ArrayList<>();

        if (dto.getLigneCommandeClients() != null) {
            dto.getLigneCommandeClients().forEach(ligCmdClt -> {
                if (ligCmdClt.getProductDto() != null) {
                    ProductDto productDto = productService.findById(ligCmdClt.getProductDto().getId());
                    Product product = ProductDto.toProduct(productDto);
                    if (product == null) {
                        articleErrors.add("Le produit avec l'ID " + ligCmdClt.getProductDto().getId() + " n'existe pas");
                    }
                    product.setNumberSell(product.getNumberSell() + 1);
                    productRepository.save(product);
                } else {
                    articleErrors.add("Impossible d'enregister une commande avec un produit NULL");
                }
            });
        }

        if (!articleErrors.isEmpty()) {
            log.warn("");
            throw new InvalidEntityException("Produit n'existe pas dans la BDD", ErrorCodes.ARTICLE_NOT_FOUND, articleErrors);
        }

        dto.setDateCommande(Instant.now());
        CommandeClient savedCmdClt = commandeClientRepository.save(CommandeClientDto.toCommandeClient(dto));

        if (dto.getLigneCommandeClients() != null) {
            dto.getLigneCommandeClients().forEach(ligCmdClt -> {
                LigneCommandeClient ligneCommandeClient = LigneCommandeClientDto.toLigneCommandeClient(ligCmdClt);
                ligneCommandeClient.setCommandeClient(savedCmdClt);
                LigneCommandeClient savedLigneCmd = ligneCommandeClientRepository.save(ligneCommandeClient);
                effectuerSortie(savedLigneCmd);
            });
        }

        return CommandeClientDto.fromCommandeClient(savedCmdClt);
    }

    @Override
    public List<CommandeClientDto> find3ByOrderByCreationDateDesc() {
        return commandeClientRepository.findTop3ByEtatCommandeOrderByIdDesc(EtatCommande.EN_PREPARATION).stream()
                .map(CommandeClientDto::fromCommandeClient)
                .collect(Collectors.toList());
    }

    @Override
    public CommandeClientDto findById(Integer id) {
        if (id == null) {
            log.error("Commande client ID is NULL");
            return null;
        }
        return commandeClientRepository.findById(id)
                .map(CommandeClientDto::fromCommandeClient)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucune commande client n'a ete trouve avec l'ID " + id, ErrorCodes.COMMANDE_CLEINT_NOT_FOUND
                ));
    }

    @Override
    public CommandeClientDto findByReference(String code) {
        if (!StringUtils.hasLength(code)) {
            log.error("Commande client CODE is NULL");
            return null;
        }
        return commandeClientRepository.findByCode(code)
                .map(CommandeClientDto::fromCommandeClient)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucune commande client n'a ete trouve avec le CODE " + code, ErrorCodes.COMMANDE_CLEINT_NOT_FOUND
                ));
    }

    @Override
    public List<LigneCommandeClientDto> findLignesByCatgorieId(Integer id) {
        return ligneCommandeClientRepository.findAllByCategoryId(id).stream()
                .map(LigneCommandeClientDto::fromLigneCommandeClient)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommandeClientDto> findAll() {
        return commandeClientRepository.findAllByOrderByIdDesc().stream()
                .map(CommandeClientDto::fromCommandeClient)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("Commande client ID is NULL");
            return;
        }
        List<LigneCommandeClient> ligneCommandeClients = ligneCommandeClientRepository.findAllByCommandeClientId(id);
        if (!ligneCommandeClients.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer une commande client deja utilisee",
                    ErrorCodes.COMMANDE_CLEINT_ALREADY_USE);
        }
        commandeClientRepository.deleteById(id);
    }

    @Override
    public List<LigneCommandeClientDto> listeLigneCommandeClientByCommande(Integer idCommande) {
        return ligneCommandeClientRepository.findAllByCommandeClientId(idCommande).stream()
                .map(LigneCommandeClientDto::fromLigneCommandeClient)
                .collect(Collectors.toList());
    }

    @Override
    public CommandeClientDto updateEtatCommandeClient(Integer idCommande, EtatCommande etatCommande) {
        checkIdCommande(idCommande);
        if (!StringUtils.hasLength(String.valueOf(etatCommande))) {
            log.error("L'etat de la commande client is NULL");
            throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un etat null",
                    ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
        CommandeClientDto commandeClient = checkEtatCommande(idCommande);
        commandeClient.setEtatCommande(etatCommande);

        CommandeClient savedCmdClt = commandeClientRepository.save(CommandeClientDto.toCommandeClient(commandeClient));
        if (commandeClient.isCommandeLivree()) {
            updateMvtStk(idCommande);
        }

        return CommandeClientDto.fromCommandeClient(savedCmdClt);
    }

    @Override
    public CommandeClientDto updateQuantiteCommandee(Integer idCommande, Integer idLigneCommande, BigDecimal quantite) {
        checkIdCommande(idCommande);
        checkIdLigneCommande(idLigneCommande);

        if (quantite == null || quantite.compareTo(BigDecimal.ZERO) == 0) {
            log.error("L'ID de la ligne commande is NULL");
            throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec une quantite null ou ZERO",
                    ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }

        CommandeClientDto commandeClient = checkEtatCommande(idCommande);
        Optional<LigneCommandeClient> ligneCommandeClientOptional = findLigneCommandeClient(idLigneCommande);

        LigneCommandeClient ligneCommandeClient = ligneCommandeClientOptional.get();
        ligneCommandeClient.setQuantite(quantite);
        ligneCommandeClientRepository.save(ligneCommandeClient);

        return commandeClient;
    }

    @Override
    public CommandeClientDto updateClient(Integer idCommande, Integer idUtilisateur) {
        checkIdCommande(idCommande);
        if (idUtilisateur == null) {
            log.error("L'ID du client is NULL");
            throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un ID client null",
                    ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
        CommandeClientDto commandeClient = checkEtatCommande(idCommande);
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepository.findById(idUtilisateur);
        if (optionalUtilisateur.isEmpty()) {
            throw new EntityNotFoundException(
                    "Aucun client n'a ete trouve avec l'ID " + idUtilisateur, ErrorCodes.CLIENT_NOT_FOUND);
        }
        commandeClient.setUtilisateurDto(UtilisateurDto.fromEntity(optionalUtilisateur.get()));

        return CommandeClientDto.fromCommandeClient(
                commandeClientRepository.save(CommandeClientDto.toCommandeClient(commandeClient))
        );
    }



    @Override
    public CommandeClientDto updateArticle(Integer idCommande, Integer idLigneCommande, Integer idArticle) {
        checkIdCommande(idCommande);
        checkIdLigneCommande(idLigneCommande);
        checkIdArticle(idArticle, "nouvel");

        CommandeClientDto commandeClient = checkEtatCommande(idCommande);

        Optional<LigneCommandeClient> ligneCommandeClient = findLigneCommandeClient(idLigneCommande);

        Optional<Product> articleOptional = productRepository.findById(idArticle);
        if (articleOptional.isEmpty()) {
            throw new EntityNotFoundException(
                    "Aucune article n'a ete trouve avec l'ID " + idArticle, ErrorCodes.ARTICLE_NOT_FOUND);
        }

        List<String> errors = ArticleValidator.validate(ProductDto.fromProduct(articleOptional.get()));
        if (!errors.isEmpty()) {
            throw new InvalidEntityException("Article invalid", ErrorCodes.ARTICLE_NOT_VALID, errors);
        }

        LigneCommandeClient ligneCommandeClientToSaved = ligneCommandeClient.get();
        ligneCommandeClientToSaved.setProduct(articleOptional.get());
        ligneCommandeClientRepository.save(ligneCommandeClientToSaved);

        return commandeClient;
    }


    @Override
    public List<LigneCommandeClientDto> findAllLignesCommande() {
        return ligneCommandeClientRepository.findAll().stream()
                .map(LigneCommandeClientDto::fromLigneCommandeClient)
                .collect(Collectors.toList());
    }

    @Override
    public CommandeClientDto deleteArticle(Integer idCommande, Integer idLigneCommande) {
        checkIdCommande(idCommande);
        checkIdLigneCommande(idLigneCommande);

        CommandeClientDto commandeClient = checkEtatCommande(idCommande);
        // Just to check the LigneCommandeClient and inform the client in case it is absent
        findLigneCommandeClient(idLigneCommande);
        ligneCommandeClientRepository.deleteById(idLigneCommande);

        return commandeClient;
    }

    @Override
    public List<CommandeClientDto> findAllCommandeClientByUtilisateurId(Integer id) {
        return commandeClientRepository.findAllCommandeClientByUtilisateurIdOrderByIdDesc(id).stream()
                .map(CommandeClientDto::fromCommandeClient)
                .collect(Collectors.toList());
    }

    @Override
    public List<Object[]> countSalesPerMonth(Integer id) {
        List<Object[]> salesPerMonth = ligneCommandeClientRepository.countSalesPerMonth(id);
        List<Object[]> result = new ArrayList<>();
        int currentYear = LocalDate.now().getYear();

        for (int month = 1; month <= 12; month++) {
            boolean monthFound = false;
            for (Object[] sale : salesPerMonth) {
                int monthValue = ((Number) sale[0]).intValue(); // Convertir le mois en int
                long salesCount = (long) sale[1];

                if (monthValue == month) {
                    result.add(new Object[]{currentYear, month, salesCount});
                    monthFound = true;
                    break;
                }
            }
            if (!monthFound) {
                // Si le mois n'a pas de ventes, ajoutez une entrée avec le nombre de ventes à 0
                result.add(new Object[]{currentYear, month, 0L});
            }
        }

        return result;
    }


    private CommandeClientDto checkEtatCommande(Integer idCommande) {
        CommandeClientDto commandeClient = findById(idCommande);
        if (commandeClient.isCommandeLivree()) {
            throw new InvalidOperationException("Impossible de modifier la commande lorsqu'elle est livree", ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
        return commandeClient;
    }

    private Optional<LigneCommandeClient> findLigneCommandeClient(Integer idLigneCommande) {
        Optional<LigneCommandeClient> ligneCommandeClientOptional = ligneCommandeClientRepository.findById(idLigneCommande);
        if (ligneCommandeClientOptional.isEmpty()) {
            throw new EntityNotFoundException(
                    "Aucune ligne commande client n'a ete trouve avec l'ID " + idLigneCommande, ErrorCodes.LIGNE_COMMANDE_CLIENT_NOT_FOUND);
        }
        return ligneCommandeClientOptional;
    }

    private void checkIdCommande(Integer idCommande) {
        if (idCommande == null) {
            log.error("Commande client ID is NULL");
            throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un ID null",
                    ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
    }

    private void checkIdLigneCommande(Integer idLigneCommande) {
        if (idLigneCommande == null) {
            log.error("L'ID de la ligne commande is NULL");
            throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec une ligne de commande null",
                    ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
    }

    private void checkIdArticle(Integer idArticle, String msg) {
        if (idArticle == null) {
            log.error("L'ID de " + msg + " is NULL");
            throw new InvalidOperationException("Impossible de modifier l'etat de la commande avec un " + msg + " ID article null",
                    ErrorCodes.COMMANDE_CLIENT_NON_MODIFIABLE);
        }
    }

    private void updateMvtStk(Integer idCommande) {
        List<LigneCommandeClient> ligneCommandeClients = ligneCommandeClientRepository.findAllByCommandeClientId(idCommande);
        ligneCommandeClients.forEach(lig -> {
            effectuerSortie(lig);
        });
    }

    private void effectuerSortie(LigneCommandeClient lig) {
        MvtStkDto mvtStkDto = MvtStkDto.builder()
                .productDto(ProductDto.fromProduct(lig.getProduct()))
                .dateMvt(Instant.now())
                .typeMvt(TypeMvt.SORTIE)
                .sourceMvtStk(SourceMvtStk.COMMANDE_CLIENT)
                .quantite(lig.getQuantite())
                .build();
        mvtStkService.sortieStock(mvtStkDto);
    }
}
