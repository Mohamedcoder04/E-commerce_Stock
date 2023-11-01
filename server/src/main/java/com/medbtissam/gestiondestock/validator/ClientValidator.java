package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.ClientDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class ClientValidator {
    public static List<String> validate(ClientDto dto){
        List<String> errors = new ArrayList<>();
        if(dto == null){
            errors.add("Veuillez renseigné les données du client");
            return errors;
        }
        if(!StringUtils.hasLength(dto.getNom())){
            errors.add("Veuillez renseigné le nom du client");
        }
        if(!StringUtils.hasLength(dto.getPrenom())){
            errors.add("Veuillez renseigné le prénom du client");
        }
        if(!StringUtils.hasLength(dto.getEmail())){
            errors.add("Veuillez renseigné l'email du client");
        }
        if(!StringUtils.hasLength(dto.getTelephone())){
            errors.add("Veuillez renseigné le numéro de téléphone du client");
        }
        errors.addAll(Adressevalidator.validate(dto.getAdresse()));

        return errors;
    }
}
