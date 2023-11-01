package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.AddressDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class Adressevalidator {
    public static List<String> validate(AddressDto adresseDto){
        List<String> errors = new ArrayList<>();
        if(adresseDto == null){
            errors.add("Veuillez renseigné les données de l'adresse");
            return errors;
        }
        if(!StringUtils.hasLength(adresseDto.getStreet())){
            errors.add("message d'erreur");
        }
        if(!StringUtils.hasLength(adresseDto.getCity())){
            errors.add("la ville est obligatoire");
        }
        if(!StringUtils.hasLength(adresseDto.getCountry())){
            errors.add("le pays est obligatoire");
        }
        if(adresseDto.getZipCode() == null){
            errors.add("le code postale est obligatoire");
        }
        return errors;
    }
}
