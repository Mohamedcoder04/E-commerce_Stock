package com.medbtissam.gestiondestock.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class MvtStk extends AbstractEntity {

    private Instant dateMvt;
    private BigDecimal quantite;

    @ManyToOne
    @JoinColumn(name = "idProduct")
    private Product product;

    @Column(name = "sourcemvt")
    private SourceMvtStk sourceMvtStk;
    private TypeMvt typeMvt;
}
