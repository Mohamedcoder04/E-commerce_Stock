package com.medbtissam.gestiondestock.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Vente extends AbstractEntity {

    @OneToMany(mappedBy = "vente")
    private List<LigneVente> ligneVentes ;
    private String code;
    private Instant dateVente;
    private String commentaire;
}
