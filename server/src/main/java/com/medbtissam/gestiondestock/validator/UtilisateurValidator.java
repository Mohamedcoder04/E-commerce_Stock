package com.medbtissam.gestiondestock.validator;
import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import org.springframework.util.StringUtils;
import java.util.ArrayList;
import java.util.List;
public class UtilisateurValidator {
    public static List<String> validate(UtilisateurDto utilisateurDto){
        List<String> errors = new ArrayList<>();
        if(utilisateurDto == null){
            errors.add("Veuillez renseigner les données de l'utilsateur...");
            return errors;
        }
        // on vérifier est ce que le code est vide
        //parceque il est obligé de remplir le code de la catégorie
        // !StringUtils.hasLength(categoryDto.getCodeCategory()) est vide
        if(!StringUtils.hasLength(utilisateurDto.getNom())){
            errors.add("Veuillez renseigner le nom de l'utilsateur...");
        }
        if(!StringUtils.hasLength(utilisateurDto.getPrenom())){
            errors.add("Veuillez renseigner le prénom de l'utilsateur...");
        }
        if(!StringUtils.hasLength(utilisateurDto.getPassword())){
            errors.add("Veuillez renseigner le mot de passe de l'utilsateur...");
        }

        if(!StringUtils.hasLength(utilisateurDto.getEmail())){
            errors.add("Veuillez renseigner l'email de l'utilsateur'...");
        }
        /*
        if(utilisateurDto.getDateDeNaissance() == null){
            errors.add("Veuillez renseigner la date de naissance de l'utilsateur'...");
        }
         */

        errors.addAll(Adressevalidator.validate(utilisateurDto.getAddress()));
        return errors;
    }
}
