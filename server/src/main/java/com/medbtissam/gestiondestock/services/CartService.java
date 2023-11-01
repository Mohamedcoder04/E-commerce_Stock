package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.carte.CartDto;

import java.util.List;


public interface CartService {

    CartDto save(CartDto dto);
    CartDto addToCart(CartDto cartDto);

    List<CartDto> findAllCartByUtilisateurId(Integer id);

    void deleteCartItem(Integer id);

    void deleteAll();
}
