package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeClientDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.medbtissam.gestiondestock.dto.LigneVenteDto;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    ProductDto save(ProductDto productDto);

    ProductDto findById(Integer id);

    ProductDto findByCodeArticle(String codeArticle);

    List<ProductDto> findAll();

    void addProducts(List<ProductDto> productDtoList);

    void delete(Integer id);

    List<ProductDto> getAll(BigDecimal minPrice, BigDecimal maxPrice);


    List<ProductDto> getMostSelling();

    List<ProductDto> getInterested();

    List<ProductDto> searchProductDisplay(String keyword);


    List<LigneVenteDto> findHistoriqueVentes(Integer idArticle);
    List<LigneCommandeClientDto> findHistoriqueCommandeClient(Integer idArticle);
    List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(Integer idArticle);

    List<ProductDto> findAllArticleByCategory(Integer idCategory);


}
