package com.medbtissam.gestiondestock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Product extends AbstractEntity {
    @Column(name = "codeProduit")
    private String codeProduit;
    private String designation;
    private BigDecimal prixUnitaireHt; //hors tva
    private BigDecimal tauxTva;
    private BigDecimal prixUnitaireTtc;
    private String photo;
    private Integer numberSell = 0;
    private Integer quantity = 0;
    private boolean promo;
    private boolean selected;
    private boolean available;


    @ManyToOne
    @JoinColumn(name = "idCategory")
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<MvtStk> mvtStks;

    @OneToMany(mappedBy = "product")
    private List<LigneVente> ligneVentes;

    @OneToMany(mappedBy = "product")
    private List<LigneCommandeClient> ligneCommandeClients;

    @OneToMany(mappedBy = "product")
    private List<LigneCommandeFournisseur> ligneCommandeFournisseurs;

}
