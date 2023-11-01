package com.medbtissam.gestiondestock.repositories.exceptions;

import lombok.Getter;

import java.util.List;


// TODO pour la validation des entitées
public class InvalidEntityException extends RuntimeException {
    @Getter
    private ErrorCodes errorCodes;
    @Getter
    List<String> errors;


    public InvalidEntityException(String message){
        super(message);
    }

    public InvalidEntityException(String message, Throwable cause){
        super(message,cause);
    }
    public InvalidEntityException(String message, Throwable cause, ErrorCodes errorCodes){
        super(message,cause);
        this.errorCodes = errorCodes;
    }
    public InvalidEntityException(String message, ErrorCodes errorCodes){
        super(message);
        this.errorCodes = errorCodes;
    }

    public InvalidEntityException(String message, ErrorCodes errorCodes,List<String> errors){
        super(message);
        this.errorCodes = errorCodes;
        this.errors = errors;
    }
}
