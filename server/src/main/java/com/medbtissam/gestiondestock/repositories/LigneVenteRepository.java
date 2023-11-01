package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.LigneVente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LigneVenteRepository extends JpaRepository<LigneVente, Integer> {

    List<LigneVente> findAllByProductId(Integer idArticle);
    List<LigneVente> findAllByVenteId(Integer idVente);
}
