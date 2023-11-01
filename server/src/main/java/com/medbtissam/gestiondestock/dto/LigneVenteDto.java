package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.LigneVente;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class LigneVenteDto {
    private Integer id;
    private VenteDto vente;

    private ProductDto article;

    private Integer idEntreprise;
    private BigDecimal quantite;
    private BigDecimal prixUnitaire;


    public static LigneVenteDto fromLigneVente(LigneVente ligneVente){
        if(ligneVente == null) throw new RuntimeException("LigneVente not found!!!");

        return LigneVenteDto.builder()
                .id(ligneVente.getId())
                .vente(VenteDto.fromVente(ligneVente.getVente()))
                .article(ProductDto.fromProduct(ligneVente.getProduct()))
                .quantite(ligneVente.getQuantite())
                .prixUnitaire(ligneVente.getPrixUnitaire())
                .build();
    }

    public static LigneVente toLigneVente(LigneVenteDto ligneVenteDto){
        if(ligneVenteDto == null ) throw new RuntimeException("LigneVente not found!!!");
        LigneVente ligneVente = new LigneVente();
        ligneVente.setId(ligneVenteDto.getId());
        ligneVente.setVente(VenteDto.toVente(ligneVenteDto.getVente()));
        ligneVente.setProduct(ProductDto.toProduct(ligneVenteDto.getArticle()));
        ligneVente.setQuantite(ligneVenteDto.getQuantite());
        ligneVente.setPrixUnitaire(ligneVenteDto.getPrixUnitaire());

        return ligneVente;
    }
}
