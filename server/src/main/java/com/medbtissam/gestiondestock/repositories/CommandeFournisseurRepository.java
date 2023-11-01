package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.CommandeFournisseur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommandeFournisseurRepository extends JpaRepository<CommandeFournisseur, Integer> {

    List<CommandeFournisseur> findAllByOrderByIdDesc();

    Optional<CommandeFournisseur> findByCode(String code);

    List<CommandeFournisseur> findAllByFournisseurId(Integer id);
}
