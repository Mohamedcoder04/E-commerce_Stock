package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.CategoryApi;
import com.medbtissam.gestiondestock.dto.CategoryDto;
import com.medbtissam.gestiondestock.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController implements CategoryApi {
    private final CategoryService categoryService;

    @Override
    public CategoryDto save(CategoryDto categoryDto) {
        return categoryService.save(categoryDto);
    }

    @Override
    public CategoryDto getCategorieById(Integer id) {
        return categoryService.findById(id);
    }

    @Override
    public CategoryDto findByCodeCategorie(String codeCategory) {
        return categoryService.findByCodeCategory(codeCategory);
    }
    @Override
    public List<CategoryDto> findAll() {
        return categoryService.findAll();
    }

    @Override
    public List<CategoryDto> findAllForHome() {
        return categoryService.findAll();
    }

    @Override
    public void delete(Integer id) {
        categoryService.delete(id);
    }
}
