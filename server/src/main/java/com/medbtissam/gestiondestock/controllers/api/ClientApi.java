package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.ClientDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "client")
@RequestMapping("/clients")
public interface ClientApi {
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ClientDto save(@RequestBody ClientDto clientDto);

    @GetMapping(value = "/client/{idClient}", produces = MediaType.APPLICATION_JSON_VALUE)
    ClientDto findById(@PathVariable("idClient") Integer id);

    @GetMapping(value = "/client/by-email/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    ClientDto findByEmail(@PathVariable("email") String email);

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ClientDto> findAll();

    @DeleteMapping(value = "/delete/{idClient}")
    void delete(@PathVariable("idClient") Integer id);
}


//*************************** avec openApi *******************************************


//package com.aghzer.gestiondestock.controllers.api;
//
//import com.aghzer.gestiondestock.dto.ClientDto;
//import io.swagger.v3.oas.annotations.Operation;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//
//import java.awt.*;
//import java.util.List;
//
//public interface ClientApi {
//    @PostMapping(value = "/clients/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet d'enregistrer un client après la créeation ou la modification d'un client")
//    ClientDto save(@RequestBody ClientDto clientDto);
//
//    @GetMapping(value = "/clients/client/{idClient}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de récupérer un client par son ID")
//    ClientDto findById(@PathVariable("idClient") Integer id);
//
//    @GetMapping(value = "/clients/client/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de récupérer un client par son email")
//    ClientDto findByEmail(@PathVariable("email") String email);
//
//    @GetMapping(value = "/clients/all", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de récupérer les clients de la BDD")
//    List<ClientDto> findAll();
//
//    @DeleteMapping(value = "/clients/delete/{idClient}")
//    @Operation(summary = "permet de récupérer un client par son email")
//    void delete(@PathVariable("idClient") Integer id);
//}
