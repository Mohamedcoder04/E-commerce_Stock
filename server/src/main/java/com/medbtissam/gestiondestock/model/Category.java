package com.medbtissam.gestiondestock.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Category extends  AbstractEntity {
    private String codeCategory;
    private String designation;

    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
