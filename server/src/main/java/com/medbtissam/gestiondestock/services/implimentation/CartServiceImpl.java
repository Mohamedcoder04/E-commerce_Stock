package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import com.medbtissam.gestiondestock.dto.carte.CartDto;
import com.medbtissam.gestiondestock.model.Cart;
import com.medbtissam.gestiondestock.repositories.CartRepository;
import com.medbtissam.gestiondestock.services.CartService;
import com.medbtissam.gestiondestock.services.ProductService;
import com.medbtissam.gestiondestock.services.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final ProductService productService;
    private final UtilisateurService utilisateurService;
    private final CartRepository cartRepository;

    @Override
    public CartDto save(CartDto dto) {
        return CartDto.fromCart(
                cartRepository.save(CartDto.toCart(dto))
        );
    }

    @Override
    public CartDto addToCart(CartDto cartDto) {
        ProductDto product = productService.findById(cartDto.getProduct().getId());
        UtilisateurDto utilisateurDto = utilisateurService.findById(cartDto.getUtilisateurDto().getId());
        Cart cart = new Cart();
        cart.setProduct(ProductDto.toProduct(product));
        cart.setUtilisateur(UtilisateurDto.toEntity(utilisateurDto));
        cart.setQuantity(cartDto.getQuantity());
        Cart save = cartRepository.save(cart);

        return CartDto.fromCart(save);
    }

    @Override
    public List<CartDto> findAllCartByUtilisateurId(Integer id) {
        return cartRepository.findAllCartByUtilisateurId(id)
                .stream().map(CartDto::fromCart)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCartItem(Integer id) {
        cartRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        cartRepository.deleteAll();
    }
}
