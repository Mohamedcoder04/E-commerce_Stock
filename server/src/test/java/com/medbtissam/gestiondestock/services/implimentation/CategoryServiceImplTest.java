package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.CategoryDto;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.services.CategoryService;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CategoryServiceImplTest {

    @Autowired
    private CategoryService service;

    @Test
    public void shouldSaveCategoryWithSuccess() {
        CategoryDto expectedCategory = CategoryDto.builder()
                .codeCategory("Cat test")
                .designation("designation test")
                .build();
        CategoryDto saveCategory = service.save(expectedCategory);

        assertNotNull(saveCategory);
        assertNotNull(saveCategory.getId());

        assertEquals(expectedCategory.getCodeCategory(), saveCategory.getCodeCategory());
        assertEquals(expectedCategory.getDesignation(), saveCategory.getDesignation());

    }

    @Test
    public void shouldUpdateCategoryWithSuccess() {
        CategoryDto expectedCategory = CategoryDto.builder()
                .codeCategory("Cat test")
                .designation("designation test")
                .build();
        CategoryDto saveCategory = service.save(expectedCategory);
        CategoryDto updateCategory = saveCategory;
        updateCategory.setCodeCategory("cat cat cat");

        service.save(updateCategory);

        assertNotNull(updateCategory);
        assertNotNull(updateCategory.getId());

        assertEquals(updateCategory.getCodeCategory(), saveCategory.getCodeCategory());
        assertEquals(updateCategory.getDesignation(), saveCategory.getDesignation());

    }

    @Test
    public void shouldInvalidEntityExveption() {
        CategoryDto categoryDto = CategoryDto.builder().build();

        InvalidEntityException expectedException = assertThrows(InvalidEntityException.class, () -> service.save(categoryDto));
        Assertions.assertEquals(ErrorCodes.CATEGORY_NOT_VALID, expectedException.getErrorCodes());
        assertEquals(1, expectedException.getErrors().size());
        assertEquals("Veuillez renseigner le code de la catégorie...", expectedException.getErrors().get(0));
    }

    @Test
    public void shouldEntityNotFoundException() {

        EntityNotFoundException expectedException = assertThrows(EntityNotFoundException.class, () -> service.findById(0));
        assertEquals(ErrorCodes.CATEGORY_NOT_FOUND, expectedException.getErrorCodes());
        assertEquals("aucune categorie a l'id 0", expectedException.getMessage());
    }

    @Test(expected = EntityNotFoundException.class) // on dit que j'attend une exception de type EntityNotFound
    public void shouldEntityNotFoundException2() {
        service.findById(0);
    }


}