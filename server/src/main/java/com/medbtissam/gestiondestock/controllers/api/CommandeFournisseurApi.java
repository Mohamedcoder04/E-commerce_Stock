package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.CommandeFournisseurDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.medbtissam.gestiondestock.model.EtatCommande;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Tag(name = "commandeFournisseur")
@RequestMapping("/commandes-fournisseur")
public interface CommandeFournisseurApi {
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeFournisseurDto> save(@RequestBody CommandeFournisseurDto dto);

    @GetMapping(value = "/{idCommandeClient}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeFournisseurDto> findById(@PathVariable("idCommandeClient") Integer id);

    @GetMapping(value = "/{referenceCommandeClient}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeFournisseurDto> findByReference(@PathVariable("referenceCommandeClient") String reference);

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<List<CommandeFournisseurDto>> findAll();

    @DeleteMapping(value = "/{idCommandeClient}")
    ResponseEntity delete(@PathVariable("idCommandeClient") Integer id);

    @PatchMapping(value = "/updatequantite/{idCommandeFournisseur}/{idLigneCommandeFournisseur}/{quantite}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CommandeFournisseurDto updateQuantity(
            @PathVariable("idCommandeFournisseur") Integer idCommandeFournisseur,
            @PathVariable("idLigneCommandeFournisseur") Integer idLigneCommandeFournisseur,
            @PathVariable("quantite") BigDecimal quantite);
    CommandeFournisseurDto updateFournisseur(Integer idCommandeFournisseur, Integer idFournisseur);

    @PatchMapping(value = "/updatearticle/{idCommandeFournisseur}/{idLigneCommandeFournisseur}/{idArticle}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CommandeFournisseurDto updateArticle(
            @PathVariable("idCommandeFournisseur") Integer idCommandeFournisseur,
            @PathVariable("idLigneCommandeFournisseur") Integer idLigneCommandeFournisseur,
            @PathVariable("idArticle") Integer idArticle);

    @GetMapping(value = "/lignescommande/{idCommande}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneCommandeFournisseurDto> findAllLigneCommande(@PathVariable("idCommande") Integer idCommandeFournisseur);

    @DeleteMapping(value = "/deletearticle/{idCommandeFournisseur}/{idLigneCommandeFournisseur}")
    CommandeFournisseurDto deleteArticle(Integer idCommandeFournisseur, Integer idLigneCommandeFournisseur);

    @PatchMapping(value = "/updatearticle/{idCommandeFournisseur}/{etatCommande}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CommandeFournisseurDto updateEtatCommandeFournisseur(
            @PathVariable("idCommandeFournisseur") Integer idCommandeFournisseur,
            @PathVariable("etatCommande") EtatCommande etatCommande);
}
