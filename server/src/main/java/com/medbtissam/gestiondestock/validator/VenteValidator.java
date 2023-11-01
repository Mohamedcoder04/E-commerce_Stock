package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.VenteDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class VenteValidator {

    public static List<String> validate(VenteDto venteDto){
        List<String> errors = new ArrayList<>();

        if(venteDto == null){
            errors.add("Veuillez renseigner le données de la vente...");
            return errors;
        }
        // on vérifier est ce que le code est vide
        //parceque il est obligé de remplir le code de la catégorie
        // !StringUtils.hasLength(categoryDto.getCodeCategory()) est vide
        if(!StringUtils.hasLength(venteDto.getCode())){
            errors.add("Veuillez renseigner le code de la vente...");
        }
        if(venteDto.getDateVente() == null){
            errors.add("Veuillez renseigner la date de vente de l'article...");
        }
        return errors;
    }
}
