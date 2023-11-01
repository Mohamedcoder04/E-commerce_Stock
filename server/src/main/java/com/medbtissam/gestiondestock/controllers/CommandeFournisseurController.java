package com.medbtissam.gestiondestock.controllers;


import com.medbtissam.gestiondestock.controllers.api.CommandeFournisseurApi;
import com.medbtissam.gestiondestock.dto.CommandeFournisseurDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.medbtissam.gestiondestock.model.EtatCommande;
import com.medbtissam.gestiondestock.services.CommandeFournisseurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommandeFournisseurController implements CommandeFournisseurApi {
    private final CommandeFournisseurService commandeFournisseurService;

    @Override
    public ResponseEntity<CommandeFournisseurDto> save(CommandeFournisseurDto dto) {
        return ResponseEntity.ok(commandeFournisseurService.save(dto));
    }

    @Override
    public ResponseEntity<CommandeFournisseurDto> findById(Integer id) {
        return ResponseEntity.ok(commandeFournisseurService.findById(id));
    }

    @Override
    public ResponseEntity<CommandeFournisseurDto> findByReference(String reference) {
        return ResponseEntity.ok(commandeFournisseurService.findByReference(reference));
    }

    @Override
    public ResponseEntity<List<CommandeFournisseurDto>> findAll() {
        return ResponseEntity.ok(commandeFournisseurService.findAll());
    }

    @Override
    public ResponseEntity delete(Integer id) {
        commandeFournisseurService.delete(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public CommandeFournisseurDto updateQuantity(Integer idCommandeFournisseur, Integer idLigneCommandeFournisseur, BigDecimal quantite) {
        return commandeFournisseurService.updateQuantity(idCommandeFournisseur, idLigneCommandeFournisseur, quantite);
    }

    @Override
    public CommandeFournisseurDto updateFournisseur(Integer idCommandeFournisseur, Integer idFournisseur) {
        return commandeFournisseurService.updateFournisseur(idCommandeFournisseur, idFournisseur);
    }

    @Override
    public CommandeFournisseurDto updateArticle(Integer idCommandeFournisseur, Integer idLigneCommandeFournisseur, Integer idArticle) {
        return commandeFournisseurService.updateArticle(idCommandeFournisseur, idLigneCommandeFournisseur, idArticle);
    }

    @Override
    public List<LigneCommandeFournisseurDto> findAllLigneCommande(Integer idCommandeFournisseur) {
        return commandeFournisseurService.findAllLigneCommande(idCommandeFournisseur);
    }

    @Override
    public CommandeFournisseurDto deleteArticle(Integer idCommandeFournisseur, Integer idLigneCommandeFournisseur) {
        return commandeFournisseurService.deleteArticle(idCommandeFournisseur, idLigneCommandeFournisseur);
    }

    @Override
    public CommandeFournisseurDto updateEtatCommandeFournisseur(Integer idCommandeFournisseur, EtatCommande etatCommande) {
        return commandeFournisseurService.updateEtatCommandeFournisseur(idCommandeFournisseur, etatCommande);
    }
}
