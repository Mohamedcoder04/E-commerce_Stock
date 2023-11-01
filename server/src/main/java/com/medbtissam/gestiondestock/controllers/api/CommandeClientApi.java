package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.CommandeClientDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeClientDto;
import com.medbtissam.gestiondestock.model.EtatCommande;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Tag(name = "commandeClient")
@RequestMapping("/commandes-client")
public interface CommandeClientApi {

    @GetMapping(value = "/count")
    ResponseEntity<Integer> getAllOrdersCount(Integer idUtilisateur);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeClientDto> save(@RequestBody CommandeClientDto dto);

    @PatchMapping(value = "/updateetatcommande/{idCommande}/{etatCommande}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeClientDto> updateEtatCommandeClient(@PathVariable("idCommande") Integer idCommande, @PathVariable("etatCommande") EtatCommande etatCommande);

    @PatchMapping(value = "/updatequantitecommande/{idCommande}/{idLigneCommande}/{quantite}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeClientDto> updateQuantiteCommandee(@PathVariable("idCommande") Integer idCommande, @PathVariable("idLigneCommande") Integer idLigneCommande, @PathVariable("quantite") BigDecimal quantite);

    @PatchMapping(value = "/updateclient/{idCommande}/{idClient}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeClientDto> updateClient(@PathVariable("idCommande") Integer idCommande, @PathVariable("idClient") Integer idClient);

    @PatchMapping(value = "/updatearticle/{idCommande}/{idLigneCommande}/{idArticle}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeClientDto> updateArticle(@PathVariable("idCommande") Integer idCommande, @PathVariable("idLigneCommande") Integer idLigneCommande, @PathVariable("idArticle") Integer idProduct);

    @DeleteMapping(value = "/deletearticle/{idCommande}/{idLigneCommande}")
    ResponseEntity<CommandeClientDto> deleteArticle(@PathVariable("{idCommande}") Integer idCommande, @PathVariable("{idLigneCommande}") Integer idLigneCommande);

    @GetMapping(value = "/lignescommande/{idCommande}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<List<LigneCommandeClientDto>> listeLigneCommandeClientByCommande(@PathVariable("idCommande") Integer idCommande);

    @GetMapping(value = "/commandes-by-user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<CommandeClientDto> findAllCommandeClientByUtilisateurId(Integer id);

    @GetMapping(value = "/{idCommandeClient}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeClientDto> findById(@PathVariable("idCommandeClient") Integer id);

    @GetMapping(value = "/commande/{referenceCommandeClient}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CommandeClientDto> findByReference(@PathVariable("referenceCommandeClient") String reference);

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<List<CommandeClientDto>> findAll();

    @GetMapping(value = "/new-commandes-clt", produces = MediaType.APPLICATION_JSON_VALUE)
    List<CommandeClientDto> find3ByOrderByCreationDateDesc();

    @GetMapping(value = "/all/lignes-commandes", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneCommandeClientDto> findAllLignesCommande();

    @DeleteMapping(value = "/{idCommandeClient}")
    ResponseEntity delete(@PathVariable("idCommandeClient") Integer id);

    @GetMapping("/lignes-par-categorie/{id}")
    List<LigneCommandeClientDto> findLignesByCatgorieId(@PathVariable("id") Integer id);

    @GetMapping("/sales-per-month/{id}")
    List<Object[]> countSalesPerMonth(Integer id);
}
