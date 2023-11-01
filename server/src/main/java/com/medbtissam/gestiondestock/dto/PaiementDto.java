package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.Paiement;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PaiementDto {

    private Integer id;
    private Double montant;
    private String mode;
    private String cardOwner;
    private BigDecimal cardNumber;
    private Integer month;
    private Integer year;
    private Integer ccv;
    private String statut;
    private CommandeClientDto commandeClientDto;

    public static Paiement toPaiement(PaiementDto dto){
        if (dto == null) {
            throw  new RuntimeException("Payment not found!");
        }
        Paiement paiement = new Paiement();
        paiement.setId(dto.getId());
        paiement.setCardOwner(dto.getCardOwner());
        paiement.setCardNumber(dto.getCardNumber());
        paiement.setMonth(dto.getMonth());
        paiement.setYear(dto.getYear());
        paiement.setCcv(dto.getCcv());
        paiement.setMode(dto.getMode());
        paiement.setCommandeClient( CommandeClientDto.toCommandeClient(dto.getCommandeClientDto()));
        paiement.setStatut(dto.getStatut());
        paiement.setMontant(dto.getMontant());
        return paiement;
    }

    public static PaiementDto fromPaiement(Paiement paiement){
        if (paiement == null) {
            throw  new RuntimeException("Payment not found!");
        }
        return PaiementDto.builder()
                .id(paiement.getId())
                .commandeClientDto(CommandeClientDto.fromCommandeClient(paiement.getCommandeClient()))
                .montant(paiement.getMontant())
                .cardOwner(paiement.getCardOwner())
                .cardNumber(paiement.getCardNumber())
                .month(paiement.getMonth())
                .year(paiement.getYear())
                .ccv(paiement.getCcv())
                .mode(paiement.getMode())
                .statut(paiement.getStatut())
                .build();
    }
}
