package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.LivraisonInfoDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class LivraisonInfovalidator {
    public static List<String> validate(LivraisonInfoDto livraisonInfoDto){
        List<String> errors = new ArrayList<>();

        if(livraisonInfoDto == null){
            errors.add("Veuillez renseigné les données de l'adresse");
            return errors;
        }
        errors.addAll(Adressevalidator.validate(livraisonInfoDto.getAddressDto()));
        if(!StringUtils.hasLength(livraisonInfoDto.getPrenom())){
            errors.add("le prénom est obligatoire");
        }
        if(!StringUtils.hasLength(livraisonInfoDto.getNom())){
            errors.add("le nom est obligatoire");
        }

        if(!StringUtils.hasLength(livraisonInfoDto.getTelephone())){
            errors.add("le téléphone est obligatoire");
        }
        return errors;
    }
}
