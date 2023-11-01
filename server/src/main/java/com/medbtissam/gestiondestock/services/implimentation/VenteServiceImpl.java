package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.LigneVenteDto;
import com.medbtissam.gestiondestock.dto.MvtStkDto;
import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.dto.VenteDto;
import com.medbtissam.gestiondestock.model.*;
import com.medbtissam.gestiondestock.repositories.LigneVenteRepository;
import com.medbtissam.gestiondestock.repositories.ProductRepository;
import com.medbtissam.gestiondestock.repositories.VenteRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.MvtStkService;
import com.medbtissam.gestiondestock.services.VenteService;
import com.medbtissam.gestiondestock.validator.VenteValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class VenteServiceImpl implements VenteService {
    private ProductRepository productRepository;
    private VenteRepository venteRepository;
    private LigneVenteRepository ligneVenteRepository;
    private MvtStkService mvtStkService;

    @Autowired
    public VenteServiceImpl(ProductRepository productRepository, VenteRepository venteRepository, LigneVenteRepository ligneVenteRepository, MvtStkService mvtStkService) {
        this.productRepository = productRepository;
        this.venteRepository = venteRepository;
        this.ligneVenteRepository = ligneVenteRepository;
        this.mvtStkService = mvtStkService;
    }

    @Override
    public VenteDto save(VenteDto venteDto) {
        List<String> errors = VenteValidator.validate(venteDto);
        if (!errors.isEmpty()) {
            log.error("vente not valid");
            throw new InvalidEntityException("la vente n'est pas valid", ErrorCodes.VENTE_NOT_VALID, errors);
        }
        List<String> articleErrors = new ArrayList<>();
        if (venteDto.getLigneVentes() != null) {
            venteDto.getLigneVentes().forEach(ligneVente -> {
                if (ligneVente.getArticle() != null) {
                    Optional<Product> article = productRepository.findById(ligneVente.getArticle().getId());
                    if (article.isEmpty()) {
                        articleErrors.add("aucun article avec l'ID" + ligneVente.getArticle().getId() + " n'a été trouvé dans la base de données");
                    }
                } else {
                    articleErrors.add("Impossible de faire une vente  avec un article vide");
                }
            });
        }
        if (!articleErrors.isEmpty()) {
            log.warn("");
            //TODO générer l'exception
        }

        Vente vente = venteRepository.save(VenteDto.toVente(venteDto));
        if (venteDto.getLigneVentes() != null) {
            venteDto.getLigneVentes().forEach(ligneVente -> {
                LigneVente vente1 = LigneVenteDto.toLigneVente(ligneVente);
                vente1.setVente(vente);
                ligneVenteRepository.save(vente1);
                updateMvtStk(vente1);
            });
        }
        return VenteDto.fromVente(vente);
    }

    @Override
    public VenteDto findById(Integer id) {
        return null;
    }

    @Override
    public VenteDto findByCode(String code) {
        return null;
    }

    @Override
    public List<VenteDto> findAll() {
        return null;
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("id user is null");
        }
        List<LigneVente> ligneVentes = ligneVenteRepository.findAllByVenteId(id);
        if (!ligneVentes.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer une vente deja utilisée dans des lignes de vente", ErrorCodes.VENTE_ALREADY_USE);
        }
    }

    private void updateMvtStk(LigneVente ligneVente) {
        MvtStkDto mvtStkDto = MvtStkDto.builder()
                .dateMvt(Instant.now())
                .quantite(ligneVente.getQuantite())
                .productDto(ProductDto.fromProduct(ligneVente.getProduct()))
                .sourceMvtStk(SourceMvtStk.VENTE)
                .typeMvt(TypeMvt.SORTIE)
                .build();
        mvtStkService.sortieStock(mvtStkDto);
    }
}
