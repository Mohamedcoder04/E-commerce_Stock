package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.LivraisonInfo;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LivraisonInfoDto {

    private Integer id;
    private String prenom ;
    private String nom ;
    private String telephone ;
    private AddressDto addressDto;

    public static LivraisonInfo toLivraisonInfo(LivraisonInfoDto livraisonInfoDto) {
        LivraisonInfo info = new LivraisonInfo();
        info.setPrenom(livraisonInfoDto.getPrenom());
        info.setNom(livraisonInfoDto.getNom());
        info.setTelephone(livraisonInfoDto.getTelephone());
        info.setAddress(AddressDto.toEntity(livraisonInfoDto.getAddressDto()));
        return info;
    }

    public static LivraisonInfoDto fromLivraisonInfo(LivraisonInfo livraisonInfo) {
        return LivraisonInfoDto.builder()
                .prenom(livraisonInfo.getPrenom())
                .nom(livraisonInfo.getNom())
                .telephone(livraisonInfo.getTelephone())
                .addressDto(AddressDto.fromEntity(livraisonInfo.getAddress()))
                .build();
    }

}
