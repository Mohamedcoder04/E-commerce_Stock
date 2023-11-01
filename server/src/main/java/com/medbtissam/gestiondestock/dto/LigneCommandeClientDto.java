package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.LigneCommandeClient;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data @Builder
public class LigneCommandeClientDto {
    private Integer id;
    private ProductDto productDto;
    private CommandeClientDto commandeClient;
    private BigDecimal quantite;
    private BigDecimal prixUnitaire;
    private Integer idEntreprise;

    public static LigneCommandeClientDto fromLigneCommandeClient(LigneCommandeClient ligneCommandeClient){
        if(ligneCommandeClient == null ) throw new RuntimeException("ligneCommandeClient not found!!");

        return LigneCommandeClientDto.builder()
                .id(ligneCommandeClient.getId())
                .productDto(ProductDto.fromProduct( ligneCommandeClient.getProduct()))
                .quantite(ligneCommandeClient.getQuantite())
                .prixUnitaire(ligneCommandeClient.getPrixUnitaire())
                .build();
    }

    public static LigneCommandeClient toLigneCommandeClient(LigneCommandeClientDto ligneCommandeClientDto){
        if(ligneCommandeClientDto == null ) throw new RuntimeException("ligne commande not found!!");

        LigneCommandeClient ligneCommandeClient   = new LigneCommandeClient();
        ligneCommandeClient.setId(ligneCommandeClientDto.getId());
        ligneCommandeClient.setProduct(ProductDto.toProduct( ligneCommandeClientDto.getProductDto()));
        ligneCommandeClient.setQuantite(ligneCommandeClientDto.getQuantite());
        ligneCommandeClient.setPrixUnitaire(ligneCommandeClientDto.getPrixUnitaire());
        return ligneCommandeClient;
    }
}
