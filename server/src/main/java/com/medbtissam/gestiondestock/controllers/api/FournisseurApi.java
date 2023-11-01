package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.FournisseurDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "fournisseur")
@RequestMapping("/fournisseurs")
public interface FournisseurApi {
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    FournisseurDto save(@RequestBody FournisseurDto fournisseurDto);

    @GetMapping(value = "/{idFournisseur}", produces = MediaType.APPLICATION_JSON_VALUE)
    FournisseurDto findById(@PathVariable("idFournisseur") Integer id);

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<FournisseurDto> findAll();

    @DeleteMapping("/{idFournisseur}")
    void delete(@PathVariable("idFournisseur") Integer id);
}


//****************************************** avec openApi *******************************************


//package com.aghzer.gestiondestock.controllers.api;
//
//import com.aghzer.gestiondestock.dto.FournisseurDto;
//import com.aghzer.gestiondestock.model.Fournisseur;
//import io.swagger.v3.oas.annotations.Operation;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//
//import javax.print.attribute.standard.Media;
//import java.util.List;
//
//public interface FournisseurApi {
//    @PostMapping(value = "/fournisseurs/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet d'enregister un fournisseur après sa création ou modification")
//    FournisseurDto save(@RequestBody FournisseurDto fournisseurDto);
//
//    @GetMapping(value = "/fournisseurs/{idFournisseur}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de récuperer un fournisseur par son ID")
//    FournisseurDto findById(@PathVariable("idFournisseur") Integer id);
//
//    @GetMapping(value = "/fournisseurs/all", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de récupérer les fournisseurs de la BDD")
//    List<FournisseurDto> findAll();
//
//    @DeleteMapping("/fournisseurs/{idFournisseur}")
//    void delete(@PathVariable("idFournisseur") Integer id);
//}
