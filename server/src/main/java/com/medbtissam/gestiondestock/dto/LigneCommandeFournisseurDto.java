package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.LigneCommandeFournisseur;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data @Builder
public class LigneCommandeFournisseurDto {
    private Integer id;
    private ProductDto productDto;
    private CommandeFournisseurDto commandeFournisseur;
    private BigDecimal quantite;
    private BigDecimal prixUnitaire;


    public static LigneCommandeFournisseurDto fromLigneCommandeFournisseur(LigneCommandeFournisseur ligneCommandeFournisseur){
        if(ligneCommandeFournisseur == null ) throw new RuntimeException("ligneCommandeFournisseur not found!!");

        return LigneCommandeFournisseurDto.builder()
                .id(ligneCommandeFournisseur.getId())
                .productDto(ProductDto.fromProduct( ligneCommandeFournisseur.getProduct()))
                .quantite(ligneCommandeFournisseur.getQuantite())
                .prixUnitaire(ligneCommandeFournisseur.getPrixUnitaire())
                .build();
    }

    public static LigneCommandeFournisseur toLigneCommandeFournisseur(LigneCommandeFournisseurDto ligneCommandeFournisseurDto){
        if(ligneCommandeFournisseurDto == null ) throw new RuntimeException("ligneCommandeFournisseur not found!!");

        LigneCommandeFournisseur ligneCommandeFournisseur   = new LigneCommandeFournisseur();

        ligneCommandeFournisseur.setId(ligneCommandeFournisseurDto.getId());
        ligneCommandeFournisseur.setProduct(ProductDto.toProduct( ligneCommandeFournisseurDto.getProductDto()));
        ligneCommandeFournisseur.setQuantite(ligneCommandeFournisseurDto.getQuantite());
        ligneCommandeFournisseur.setPrixUnitaire(ligneCommandeFournisseurDto.getPrixUnitaire());
        return ligneCommandeFournisseur;
    }
}
