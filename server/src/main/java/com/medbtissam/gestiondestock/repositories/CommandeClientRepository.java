package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.CommandeClient;
import com.medbtissam.gestiondestock.model.EtatCommande;
import com.medbtissam.gestiondestock.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommandeClientRepository extends JpaRepository<CommandeClient, Integer>
{
    Optional<CommandeClient> findByCode(String reference);

    List<CommandeClient> findTop3ByEtatCommandeOrderByIdDesc(EtatCommande etatCommande);

    List<CommandeClient> findAllByOrderByIdDesc();

    //@Query("select c from CommandeClient c where c.client.id = :id")
    List<CommandeClient> findAllCommandeClientByUtilisateurIdOrderByDateCommandeDesc(@Param("id") Integer id);

    List<CommandeClient> findAllCommandeClientByUtilisateurIdOrderByIdDesc(@Param("id") Integer id);

    Optional<Integer> countAllByUtilisateur(Utilisateur utilisateur);



}
