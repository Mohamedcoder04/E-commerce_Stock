package com.medbtissam.gestiondestock.dto.carte;

import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import com.medbtissam.gestiondestock.model.Cart;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartDto {
    private Integer id;
    private UtilisateurDto utilisateurDto;
    private ProductDto product;
    private Integer quantity;

    public static Cart toCart(CartDto cartDto) {
        if (cartDto == null) throw new RuntimeException("Article not found!!");

        Cart cart = new Cart();
        cart.setId(cartDto.getId());
        cart.setUtilisateur(UtilisateurDto.toEntity(cartDto.getUtilisateurDto()));
        cart.setProduct(ProductDto.toProduct(cartDto.getProduct()));
        cart.setQuantity(cartDto.getQuantity());
        return cart;
    }

    public static CartDto fromCart(Cart cart) {
        if (cart == null) throw new RuntimeException("Article not found!!");

        return CartDto.builder()
                .id(cart.getId())
                .utilisateurDto(UtilisateurDto.fromEntity(cart.getUtilisateur()))
                .quantity(cart.getQuantity())
                .product(ProductDto.fromProduct(cart.getProduct()))
                .build();
    }
}
