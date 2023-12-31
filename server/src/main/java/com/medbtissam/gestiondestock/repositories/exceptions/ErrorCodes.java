package com.medbtissam.gestiondestock.repositories.exceptions;

public enum ErrorCodes {
    ARTICLE_NOT_FOUND(1000),
    // TODO créer votre exception article avec un numéro entre 1001 et 1999
    ARTICLE_NOT_VALID(1001),
    ARTICLE_ALREADY_USE(1002),

    CATEGORY_NOT_FOUND(2000),

    NOTIFICATION_NOT_FOUND(20000),
    // TODO créer votre exception category avec un numéro entre 2001 et 2999
    CATEGORY_NOT_VALID(2001),
    CATEGORY_ALREADY_USED(2002),

    // TODO créer votre exception client avec un numéro entre 3001 et 3999
    CLIENT_NOT_FOUND(3000),
    CLIENT_NOT_VALID(3001),
    CLIENT_ALREADY_USE(3002),

    COMMANDE_CLEINT_NOT_FOUND(4000),
    COMMANDE_CLEINT_NOT_VALID(4001),
    COMMANDE_CLIENT_NON_MODIFIABLE(4002),
    COMMANDE_CLEINT_ALREADY_USE(4003),
    COMMANDE_FOURNISSEUR_NOT_FOUND(5000),
    COMMANDE_FOURNISSEUR_NOT_VALID(5001),
    COMMANDE_FOURNISSEUR_NON_MODIFIABLE(5002),
    COMMANDE_FOURNISSEUR__ALREADY_USE(5003),

    ENTREPRISE_NOT_FOUND(6000),
    ENTREPRISE_NOT_VALID(6001),
    ENTREPRISE_ALREADY_USE(6002),

    FOURNISSEUR_NOT_FOUND(7000),
    FOURNISSEUR_NOT_VALID(7001),
    FOURNISSEUR_ALREADY_USE(7002),
    LIGNE_COMMANDE_CLIENT_NOT_FOUND(8000),

    LIGNE_COMMANDE_FOURNISSEUR_NOT_FOUND(9000),
    LIGNE_COMMANDE_FOURNISSEUR_ALREADY_USE(9001),

    LIGNE_VENTE_NOT_FOUND(10000),
    LIGNE_VENTE_NOT_VALID(10001),
    LIGNE_VENTE_ALREADY_USE(10002),

    MVTSTK_NOT_FOUND(11000),
    MVTSTK_NOT_VALID(11001),

    // TODO créer votre exception utilisateur avec un numéro entre 12001 et 12999,
    UTILISATEUR_NOT_FOUND(12000),
    UTILISATEUR_NOT_VALID(12001),
    UTILISATEUR_CHANGE_PASSWORD_NULL(12003),
    UTILISATEUR_CHANGE_OLD_PASSWORD_INVALID(12004),


    VENTE_NOT_FOUND(13000),
    VENTE_NOT_VALID(13001),
    VENTE_ALREADY_USE(13002),
    BAD_CREDETIALS(14000),
    UPDATE_PHOTO_EXCEPTION(15000),
    CONTEXT_INCONNU(16000),
    PAIEMENT_NOT_VALID(16000)
    ;
    private int code;

    ErrorCodes(int code){
        this.code = code;
    }
    public int getCode() {
        return code;
    }
}
