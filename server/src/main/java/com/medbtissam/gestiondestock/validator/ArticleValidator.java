package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.ProductDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class ArticleValidator {

    public static List<String> validate(ProductDto productDto){
        List<String> errors = new ArrayList<>();

        if(productDto == null){
            errors.add("Veuillez renseigner le données de l'article...");
            return errors;
        }
        if(productDto.getCategory().getId() == null){
            errors.add("Veuillez sélétionner une catégorie...");
        }

        // on vérifier est ce que le code est vide
        //parceque il est obligé de remplir le code de la catégorie
        // !StringUtils.hasLength(categoryDto.getCodeCategory()) est vide

        if(!StringUtils.hasLength(productDto.getCodeProduit())){
            errors.add("Veuillez renseigner le code de l'article...");
        }
        if(productDto.getPrixUnitaireHt() == null){
            errors.add("Veuillez renseigner le prixUnitaireHt de l'article...");
        }
        if(productDto.getPrixUnitaireTtc() == null){
            errors.add("Veuillez renseigner le prixUnitaireTtc de l'article...");
        }

        if(productDto.getTauxTva() == null){
            errors.add("Veuillez renseigner le tauxTva de l'article...");
        }

        return errors;
    }
}
