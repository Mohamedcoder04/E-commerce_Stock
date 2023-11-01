package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findAllCartByUtilisateurId(Integer id);
}
