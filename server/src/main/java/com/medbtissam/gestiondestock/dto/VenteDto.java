package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.Vente;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data @Builder
public class VenteDto {
    private Integer id;
    private String code;
    private Instant dateVente;
    private String commentaire;

    private Integer idEntreprise;

    @JsonIgnore
    private List<LigneVenteDto> ligneVentes ;

    public static VenteDto fromVente(Vente vente){
        if(vente == null ) throw new RuntimeException("Vente not found!!!");

        return VenteDto.builder()
                .id(vente.getId())
                .code(vente.getCode())
                .dateVente(vente.getDateVente())
                .commentaire(vente.getCommentaire())
                .build();
    }

    public static Vente toVente(VenteDto venteDto){
        if(venteDto == null ) throw new RuntimeException("Vente not found!!!");

        Vente vente = new Vente();
        vente.setId(venteDto.getId());
        vente.setCode(venteDto.getCode());
        vente.setDateVente(venteDto.getDateVente());
        vente.setCommentaire(venteDto.getCommentaire());
        return vente;
    }
}
