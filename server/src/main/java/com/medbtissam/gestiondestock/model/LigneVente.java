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
public class LigneVente extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "idVente")
    private Vente vente;
    @ManyToOne
    @JoinColumn(name = "idArticle")
    private Product product;

    private BigDecimal quantite;
    private BigDecimal prixUnitaire;
}
