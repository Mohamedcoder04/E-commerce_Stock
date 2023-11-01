package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.CartApi;
import com.medbtissam.gestiondestock.dto.carte.CartDto;
import com.medbtissam.gestiondestock.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartController implements CartApi {

    private final CartService service;

    @Override
    public CartDto save(CartDto cartDto) {
        return service.save(cartDto);
    }

    @Override
    public CartDto addToCarte(CartDto cartDto) {
        return service.addToCart(cartDto);
    }

    @Override
    public List<CartDto> findAllCartByUtilisateurId(Integer id) {
        return service.findAllCartByUtilisateurId(id);
    }

    @Override
    public void delete(Integer id) {
        service.deleteCartItem(id);
    }

    @Override
    public void deleteAll() {
        service.deleteAll();
    }
}
