package com.medbtissam.gestiondestock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;


@Data
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
@Entity
public class Role extends AbstractEntity {

    private String roleName;

}
