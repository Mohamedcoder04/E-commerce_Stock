package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Optional;

public interface PaiementRepository extends JpaRepository<Paiement , Integer> {

    @Query("select sum(p.montant) from Paiement p")
    Double findSumAllPaiements();

}
