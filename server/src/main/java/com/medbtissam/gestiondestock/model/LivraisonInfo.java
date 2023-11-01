package com.medbtissam.gestiondestock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class LivraisonInfo implements Serializable {

    private String prenom ;

    private String nom ;
    private String telephone ;

    @Embedded
    private Address address ;

}
