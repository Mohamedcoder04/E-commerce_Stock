package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByCodeCategory(String codeCategory);
    List<Category> findAllByOrderByCodeCategory();
}
