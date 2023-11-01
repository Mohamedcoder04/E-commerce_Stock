package com.medbtissam.gestiondestock.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class LigneCommandeFournisseur extends AbstractEntity {
    @ManyToOne
    @JoinColumn(name = "idArticle")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "idCommandeFournisseur")
    private CommandeFournisseur commandeFournisseur;

    private BigDecimal quantite;
    private BigDecimal prixUnitaire;
}
