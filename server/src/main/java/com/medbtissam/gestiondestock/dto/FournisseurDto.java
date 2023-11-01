package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.Fournisseur;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Embedded;
import java.util.List;

@Data @Builder
public class FournisseurDto {
    private Integer id;
    private String nom;
    private String prenom;
    private String photo;
    private String email;
    private String telephone;
    private Integer idEntreprise;

    @Embedded
    private AddressDto address;

    @JsonIgnore
    private List<CommandeFournisseurDto> commandeFournisseurs;

    public static FournisseurDto fromFournisseur(Fournisseur fournisseur){
        if(fournisseur == null ) throw new RuntimeException("Fournisseur not found!!");

        return FournisseurDto.builder()
                .id(fournisseur.getId())
                .nom(fournisseur.getNom())
                .prenom(fournisseur.getPrenom())
                .photo(fournisseur.getPhoto())
                .email(fournisseur.getEmail())
                .telephone(fournisseur.getNumTel())
                .address(AddressDto.fromEntity(fournisseur.getAdresse()))
                .build();
    }

    public static Fournisseur toFournisseur(FournisseurDto fournisseurDto){
        if(fournisseurDto == null ) throw new RuntimeException("Fournisseur not found!!");
        Fournisseur fournisseur = new Fournisseur();
        fournisseur.setId(fournisseurDto.getId());
        fournisseur.setNom(fournisseurDto.getNom());
        fournisseur.setPrenom(fournisseurDto.getPrenom());
        fournisseur.setPhoto(fournisseurDto.getPhoto());
        fournisseur.setEmail(fournisseurDto.getEmail());
        fournisseur.setNumTel(fournisseurDto.getTelephone());
        fournisseur.setAdresse(AddressDto.toEntity(fournisseurDto.getAddress()));

        return fournisseur;
    }
}
