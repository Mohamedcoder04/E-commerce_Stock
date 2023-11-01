//package com.aghzer.gestiondestock.controllers.api;
//
//import com.aghzer.gestiondestock.dto.ArticleDto;
//import com.aghzer.gestiondestock.model.Article;
//import io.swagger.v3.oas.annotations.Operation;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//public interface ArticleApi {
//
//    @PostMapping(value = "/articles/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de créer un article")
//    ArticleDto save(@RequestBody ArticleDto articleDto);
//
//    @GetMapping(value = "/articles/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de chercher un article par son ID")
//    ArticleDto findById(@PathVariable("idArticle") Integer id); //on définit le nom c'est les nomVariables ne sont pas les même
//
//    @GetMapping(value = "/articles/{codeArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de chercher un article par son code")
//    ArticleDto findByCodeArticle(@PathVariable String codeArticle);
//
//    @GetMapping(value = "/articles/all", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de récupérer les article de la BDD")
//    List<ArticleDto> findAll();
//
//    @DeleteMapping(value = "/articles/delete/{idArticle}")
//    @Operation(summary = "permet de supprimer un article")
//    void delete(@PathVariable("idArticle") Integer id);
//}

 //documentation avec swagger ms j'ai un erreur et je suis en train de cherhcer la solutions

package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeClientDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.medbtissam.gestiondestock.dto.LigneVenteDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Tag( name = "product")
@RequestMapping("/products")
public interface ProductApi {

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ProductDto save(@RequestBody ProductDto productDto);

    @PostMapping(value = "/add-products", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    void addProducts(@RequestBody List<ProductDto> productDto);

    @GetMapping(value = "/by-price/{min}/{max}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ProductDto> getProductByPrix(@PathVariable("min") BigDecimal minPrice, @PathVariable("max") BigDecimal maxPrice);
    @GetMapping(value = "/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    ProductDto findById(@PathVariable("idArticle") Integer id); //on définit le nom c'est les nomVariables ne sont pas les même

    @GetMapping(value = "/by-code-article/{codeArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    ProductDto findByCodeArticle(@PathVariable String codeArticle);

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ProductDto> findAllForHome();
    @GetMapping(value = "/admin/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ProductDto> findAll();

    @DeleteMapping(value = "/delete/{idArticle}")
    void delete(@PathVariable("idArticle") Integer id);

    @GetMapping(value = "/historique/ventes/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneVenteDto> findHistoriqueVentes(@PathVariable("idArticle") Integer idArticle);

    @GetMapping(value = "/historique/commandesclient/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneCommandeClientDto> findHistoriqueCommandeClient(@PathVariable("idArticle")Integer idArticle);

    @GetMapping(value = "/historique/commandefournisseur/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(@PathVariable("idArticle")Integer idArticle);

    @GetMapping(value = "/filter/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ProductDto> findAllArticleByCategory(@PathVariable("idCategory")Integer idCategory);

    @GetMapping(value = "/most-selling", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ProductDto> getMostSelling();

    @GetMapping(value = "/products/interested", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ProductDto> getInterested();

    @GetMapping(value = "/search/{keyword}/{page}/{size}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<ProductDto> searchProducts(String keyword);


}
