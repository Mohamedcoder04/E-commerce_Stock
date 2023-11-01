package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.CategoryDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class CategoryValidator {

    public static List<String> validate(CategoryDto categoryDto){
        List<String> errors = new ArrayList<>();

        // on vérifier est ce que le code est vide
        //parceque il est obligé de remplir le code de la catégorie
        // !StringUtils.hasLength(categoryDto.getCodeCategory()) est vide
        if(categoryDto == null || !StringUtils.hasLength(categoryDto.getCodeCategory())){
            errors.add("Veuillez renseigner le code de la catégorie...");
        }
        if(categoryDto == null || !StringUtils.hasLength(categoryDto.getCodeCategory())){
            errors.add("Veuillez renseigner la désignation de la catégorie...");
        }
        return errors;
    }
}
