package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.CommandeClientDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeClientDto;
import com.medbtissam.gestiondestock.model.CommandeClient;
import com.medbtissam.gestiondestock.model.EtatCommande;
import com.medbtissam.gestiondestock.model.LigneCommandeClient;

import java.math.BigDecimal;
import java.util.List;

public interface CommandeClientService {

    Integer getAllOrdersCount(Integer id);

    CommandeClientDto save(CommandeClientDto dto);

    List<CommandeClientDto> find3ByOrderByCreationDateDesc();

    CommandeClientDto findById(Integer id);
    CommandeClientDto findByReference(String reference);
    List<CommandeClientDto> findAll();
    void delete(Integer id);

    CommandeClientDto updateEtatCommandeClient(Integer idCommande, EtatCommande etatCommande);

    CommandeClientDto updateQuantiteCommandee(Integer idCommande, Integer idLigneCommande, BigDecimal quantite);

    CommandeClientDto updateClient(Integer idCommandeClient, Integer idUtilisateur);

    CommandeClientDto updateArticle(Integer idCommande,Integer idLigneCommande, Integer idArticle);

    //TODO ça équivalent à deleteLigneCommande
    CommandeClientDto deleteArticle(Integer idCommande, Integer idLigneCommande);

    List<LigneCommandeClientDto> listeLigneCommandeClientByCommande(Integer idCommande);

    List<LigneCommandeClientDto> findAllLignesCommande();

    List<LigneCommandeClientDto> findLignesByCatgorieId(Integer id);

    List<CommandeClientDto> findAllCommandeClientByUtilisateurId(Integer id);

    List<Object[]> countSalesPerMonth(Integer id);


}
