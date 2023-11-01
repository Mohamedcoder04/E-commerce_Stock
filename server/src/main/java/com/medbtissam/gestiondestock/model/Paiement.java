package com.medbtissam.gestiondestock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Paiement extends AbstractEntity {

    private Double montant;
    private String mode;
    private String cardOwner;
    private BigDecimal cardNumber;
    private Integer month;
    private Integer year;
    private Integer ccv;
    private String statut;

    @OneToOne
    private CommandeClient commandeClient;
}
