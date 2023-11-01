package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.FournisseurDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class FournisseurValidator {
    public static List<String> validate(FournisseurDto dto){
        List<String> errors = new ArrayList<>();
        if(dto == null){
            errors.add("Veuillez renseigné les données du fournisseur");
            return errors;
        }
        if(!StringUtils.hasLength(dto.getNom())){
            errors.add("Veuillez renseigné le nom du fournisseur");
        }
        if(!StringUtils.hasLength(dto.getPrenom())){
            errors.add("Veuillez renseigné le prénom du fournisseur");
        }
        if(!StringUtils.hasLength(dto.getEmail())){
            errors.add("Veuillez renseigné l'email du fournisseur");
        }
        if(!StringUtils.hasLength(dto.getTelephone())){
            errors.add("Veuillez renseigné le numéro de téléphone du fournisseur");
        }
        errors.addAll(Adressevalidator.validate(dto.getAddress()));
        return errors;
    }
}
