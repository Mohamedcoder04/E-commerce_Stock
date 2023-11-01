package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.VenteDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "vente")
@RequestMapping("/ventes")
public interface VenteApi {
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    VenteDto save(@RequestBody VenteDto venteDto);

    @GetMapping(value = "/utilisateur/{idVente}", produces = MediaType.APPLICATION_JSON_VALUE)
    VenteDto findById(@PathVariable("idVente") Integer id);

    @GetMapping(value = "/utilisateur/{code}", produces = MediaType.APPLICATION_JSON_VALUE)
    VenteDto findByCode(String code);

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<VenteDto> findAll();

    @DeleteMapping(value = "/delete/{idVente}")
    void delete(@PathVariable("idVente") Integer id);

}
