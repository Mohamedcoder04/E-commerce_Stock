package com.medbtissam.gestiondestock.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class LigneCommandeClient extends  AbstractEntity {

    @ManyToOne
    @JoinColumn(name="idProduct")
    private Product product;
    @ManyToOne
    @JoinColumn(name="idCommandeClient")
    private CommandeClient commandeClient;

    private BigDecimal quantite;
    private BigDecimal prixUnitaire;
}
