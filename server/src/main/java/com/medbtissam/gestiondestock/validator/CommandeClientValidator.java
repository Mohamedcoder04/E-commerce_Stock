package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.CommandeClientDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class CommandeClientValidator {

    public static List<String> validate(CommandeClientDto commandeClientDto){
        List<String> errors = new ArrayList<>();

        if(commandeClientDto == null){
            errors.add("Veuillez renseigné les données de la commande client");
            return errors;
        }
        if(!StringUtils.hasLength(commandeClientDto.getCode())){
            errors.add("Veuillez renseigné le code de la commande client");
        }
        if(!StringUtils.hasLength(commandeClientDto.getEtatCommande().toString())){
            errors.add("Veuillez renseigné l'état de la commande client");
        }

        errors.addAll(LivraisonInfovalidator.validate(commandeClientDto.getLivraisonInfoDto()));

        return errors;
    }
}
