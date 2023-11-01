package com.medbtissam.gestiondestock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Address implements Serializable {

    private String street;

    private Integer houseNumber;

    private Integer zipCode;

    private String city;

    private String country;


}