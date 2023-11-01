package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.carte.CartDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cart")
@Tag(name = "cart")
public interface CartApi {

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CartDto save(@RequestBody CartDto cartDto);

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CartDto addToCarte(@RequestBody CartDto cartDto);

    @GetMapping(value = "/all-cart/{id}")
    List<CartDto> findAllCartByUtilisateurId(@PathVariable("id") Integer id);

    @DeleteMapping(value = "/delete/{idCart}")
    void delete(@PathVariable("idCart") Integer id);

    @DeleteMapping(value = "/delete-all")
    void deleteAll();
}
