package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {

    @Query("SELECT u FROM Utilisateur u WHERE u.email = :email")
    Optional<Utilisateur> findUtilisateurByEmail(@Param("email") String email);

    @Query("SELECT u FROM Utilisateur u WHERE u.role.roleName = :role")
    List<Utilisateur> findUtilisateursByRole(@Param("role") String role);

    @Query("SELECT COUNT(u) FROM Utilisateur u WHERE (SELECT COUNT(c) FROM u.commandeClients c) > 0")
    Integer getNumberUtilisateursByCommandeClients();
}