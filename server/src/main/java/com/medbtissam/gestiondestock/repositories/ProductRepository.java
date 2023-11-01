package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.Category;
import com.medbtissam.gestiondestock.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {

    @Query(" SELECT p FROM Product p order by id desc ")
    List<Product> findAllByOrderByIdDesc();

    @Query(" SELECT p FROM Product p where p.prixUnitaireHt between :min and :max")
    List<Product> findAllByPrixUnitaireHt(BigDecimal min, BigDecimal max);

    List<Product> findAllByOrderByPrixUnitaireHtDesc();

    List<Product> findAllByOrderByPrixUnitaireHtAsc();

    Optional<Product> findProductByCodeProduit(String codeArticle);

    List<Product> findAllByCategoryId(Integer idCategory);

    List<Product> findAllByCategory(Category category);

    List<Product> findTop8ByOrderByNumberSellDesc();

    List<Product> findTop8ByOrderByCreationDate();

    List<Product> findAllByCodeProduitContainingIgnoreCase(String name);

    List<Product> findTop8ByCategoryAndIdIsNot(Category category, Integer id);

    List<Product> findAllByCategoryIsNot(Category category);
}
