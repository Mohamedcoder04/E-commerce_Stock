package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.ProductApi;
import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeClientDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.medbtissam.gestiondestock.dto.LigneVenteDto;
import com.medbtissam.gestiondestock.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController implements ProductApi {
    private final ProductService productService;


    @Override
    public ProductDto save(ProductDto productDto) {
        return productService.save(productDto);
    }

    @Override
    public List<ProductDto> getProductByPrix(BigDecimal minPrice, BigDecimal maxPrice) {
        return productService.getAll(minPrice,maxPrice);
    }

    @Override
    public void addProducts(List<ProductDto> productDto) {
        productService.addProducts(productDto);
    }

    @Override
    public ProductDto findById(Integer id) {
        return productService.findById(id);
    }


    @Override
    public ProductDto findByCodeArticle(String codeArticle) {
        return productService.findByCodeArticle(codeArticle);
    }
    @Override
    public List<ProductDto> findAll() {
        return productService.findAll();
    }

    @Override
    public List<ProductDto> findAllForHome() {
        return productService.findAll();
    }

    @Override
    public void delete(Integer id) {
        productService.delete(id);
    }

    @Override
    public List<LigneVenteDto> findHistoriqueVentes(Integer idArticle) {
        return productService.findHistoriqueVentes(idArticle);
    }

    @Override
    public List<LigneCommandeClientDto> findHistoriqueCommandeClient(Integer idArticle) {
        return productService.findHistoriqueCommandeClient(idArticle);
    }

    @Override
    public List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(Integer idArticle) {
        return productService.findHistoriqueCommandeFournisseur(idArticle);
    }

    @Override
    public List<ProductDto> findAllArticleByCategory(Integer idCategory) {
        return productService.findAllArticleByCategory(idCategory);
    }


    @Override
    public List<ProductDto> getMostSelling() {
        return productService.getMostSelling();
    }

    @Override
    public List<ProductDto> getInterested() {
        return productService.getInterested();
    }

    @Override
    public List<ProductDto> searchProducts(String keyword) {
        return productService.searchProductDisplay(keyword);
    }
}
