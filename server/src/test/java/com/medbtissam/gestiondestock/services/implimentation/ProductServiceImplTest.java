package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.CategoryDto;
import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.services.CategoryService;
import com.medbtissam.gestiondestock.services.ProductService;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProductServiceImplTest {

    @Autowired
    private ProductService service;
    @Autowired
    private CategoryService categoryService;

    @Test
    public void shouldSaveArticleWithSuccess(){
        CategoryDto categoryDto = categoryService.findById(15);
        ProductDto expectedArticle = ProductDto.builder()
                .codeProduit("Article test")
                .designation("designation test")
                .prixUnitaireTtc(BigDecimal.ONE)
                .prixUnitaireHt(BigDecimal.TEN)
                .tauxTva(BigDecimal.ONE)
                .category(categoryDto)
                .build();
        ProductDto saveArticle = service.save(expectedArticle);

        assertNotNull(saveArticle);
        assertNotNull(saveArticle.getId());

        assertEquals(expectedArticle.getCodeProduit(), saveArticle.getCodeProduit());
        assertEquals(expectedArticle.getDesignation(), saveArticle.getDesignation());
        assertEquals(expectedArticle.getCategory(), saveArticle.getCategory());

    }



    @Test
    public void shouldInvalidEntityExveption(){
        ProductDto productDto = ProductDto.builder().build();

        InvalidEntityException expectedException = assertThrows(InvalidEntityException.class, ()-> service.save(productDto));
        Assertions.assertEquals( ErrorCodes.ARTICLE_NOT_VALID, expectedException.getErrorCodes() );
        assertEquals(5, expectedException.getErrors().size() );
        assertEquals("Veuillez renseigner le code de l'article...", expectedException.getErrors().get(0));
    }

    @Test
    public void shouldEntityNotFoundException(){

        EntityNotFoundException expectedException = assertThrows(EntityNotFoundException.class, ()-> service.findById(0));
        assertEquals( ErrorCodes.ARTICLE_NOT_FOUND, expectedException.getErrorCodes() );
        assertEquals("aucun Article a l'Id 0", expectedException.getMessage());
    }

    @Test(expected = EntityNotFoundException.class) // on dit que j'attend une exception de type EntityNotFound
    public void shouldEntityNotFoundException2(){
        service.findById(0);
    }


}