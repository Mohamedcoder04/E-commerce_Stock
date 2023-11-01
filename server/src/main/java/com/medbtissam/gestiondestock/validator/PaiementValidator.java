package com.medbtissam.gestiondestock.validator;

import com.medbtissam.gestiondestock.dto.PaiementDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class PaiementValidator {

    public static List<String> validate(PaiementDto paiementDto){
        List<String> errors = new ArrayList<>();

        if(paiementDto == null){
            errors.add("Veuillez continuer le paiement...");
            return errors;
        }

        if(!StringUtils.hasLength(paiementDto.getCardOwner())){
            errors.add("Veuillez renseigner votre cardOwner");
        }

        if(paiementDto.getCardNumber() == null){
            errors.add("Veuillez renseigner votre cardNumber");
        }else

        if(paiementDto.getCardNumber() != null && (paiementDto.getCardNumber().toString().length() != 16) ){
            errors.add("le cardNumber doit contenir 16 chiffres");
        }

        if(paiementDto.getCcv() == null){
            errors.add("Veuillez renseigner votre CardCcv ");
        }

        if(paiementDto.getMonth() == null && paiementDto.getYear() == null){
            errors.add("Veuillez renseigner la date d'expiration ");
        }

        if(paiementDto.getCcv() != null && (paiementDto.getCcv().toString().length() != 3) ){
            errors.add("le CardCcv doit contenir 3 chiffres");
        }


        /*
        if(!StringUtils.hasLength(paiementDto.getDetails())){
            errors.add("Veuillez renseigner les détails de la paiement...");
        }
        */

        return errors;
    }
}
