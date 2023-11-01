package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.Vente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenteRepository extends JpaRepository<Vente, Integer> {
}
