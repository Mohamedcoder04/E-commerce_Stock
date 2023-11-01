package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.CategoryDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag( name = "categorie")
@RequestMapping("/categories")
public interface CategoryApi {
    @PostMapping(value = "/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDto save(@RequestBody CategoryDto categoryDto);

    @GetMapping(value = "/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDto getCategorieById(@PathVariable("idCategory") Integer id);

    @GetMapping(value = "/category/{codeCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDto findByCodeCategorie(@PathVariable("codeCategory") String codeCategory);

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<CategoryDto> findAllForHome();

    @GetMapping(value = "/adimn/all", produces = MediaType.APPLICATION_JSON_VALUE)
    List<CategoryDto> findAll();

    @DeleteMapping(value = "categories/delete/{idCategory}")
    void delete(@PathVariable("idCategory") Integer id);
}



// *********************************  avec openApi  *********************************

//package com.aghzer.gestiondestock.controllers.api;
//
//import com.aghzer.gestiondestock.dto.CategoryDto;
//import org.springframework.http.MediaType;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//public interface CategoryApi {
//    @PostMapping(value = "/categories/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet d'enregistrer la catégorie aprés la création ou la modification")
//    CategoryDto save(@RequestBody CategoryDto categoryDto);
//
//    @GetMapping(value = "/categories/{idCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de chercher la catégorie par son ID")
//    CategoryDto findById(@PathVariable("idCategory") Integer id);
//
//    @GetMapping(value = "/categories/{codeCategory}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de chercher la catégorie par son code")
//    CategoryDto findByCodeArticle(@Parameter(description = "accept values [Cat1,Cat2,Cat3]") @PathVariable("codeCategory") String codeCategory);
//
//    @GetMapping(value = "/categories/all", produces = MediaType.APPLICATION_JSON_VALUE)
//    @Operation(summary = "permet de récupérer les catégories de la BDD")
//    List<CategoryDto> findAll();
//
//    @DeleteMapping(value = "/categories/delete/{idCategory}")
//    @Operation(summary = "permet de supprimer une catégorie")
//    void delete(@PathVariable("idCategory") Integer id);
//}
