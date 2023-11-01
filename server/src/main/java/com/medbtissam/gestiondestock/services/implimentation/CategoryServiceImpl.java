package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.CategoryDto;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.model.Product;
import com.medbtissam.gestiondestock.model.Category;
import com.medbtissam.gestiondestock.repositories.ProductRepository;
import com.medbtissam.gestiondestock.repositories.CategoryRepository;
import com.medbtissam.gestiondestock.services.CategoryService;
import com.medbtissam.gestiondestock.validator.CategoryValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service @Slf4j
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, ProductRepository productRepository){
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public CategoryDto save(CategoryDto categoryDto) {
        List<String> errors = CategoryValidator.validate(categoryDto);
        if(!errors.isEmpty()){
            log.error("Category not valid {}", categoryDto);
            throw new InvalidEntityException("La Catégorie n'est pas valid", ErrorCodes.CATEGORY_NOT_VALID, errors);
        }
        Category category = categoryRepository.save(CategoryDto.toCategory(categoryDto));
        CategoryDto dtoResult = CategoryDto.fromCategory(category);
        return dtoResult;
    }

    @Override
    public CategoryDto findById(Integer id) {
        if(id == null){
            log.error("Id Catégorie is null");
            return null;
        }
        // TODO 1er methode pour retourné CatgeoryDto

        /*Optional<Category> category = categoryRepository.findById(id);
        CategoryDto dto = CategoryDto.fromCategory(category.get());
        return Optional.of(dto).orElseThrow(()->
                new EntityNotFoundException("aucune categorie a l'id "+id, ErrorCodes.CATEGORY_NOT_FOUND));
        */
        // TODO 2éme methode pour retourné CatgeoryDto

        return categoryRepository.findById(id)
                .map(CategoryDto::fromCategory).orElseThrow(
                        ()-> new EntityNotFoundException("aucune categorie a l'id "+id, ErrorCodes.CATEGORY_NOT_FOUND)
                );


    }

    @Override
    public CategoryDto findByCodeCategory(String codeCategory) {
        if(!StringUtils.hasLength(codeCategory)){
            log.error("code Catégorie is null");
            return null;
        }
        Optional<Category> category = categoryRepository.findByCodeCategory(codeCategory);

            return Optional.of(CategoryDto.fromCategory(category.get())).orElseThrow(()->
                    new EntityNotFoundException("aucune catégorie n'a ce code "+codeCategory, ErrorCodes.CATEGORY_NOT_FOUND));
    }

    @Override
    public List<CategoryDto> findAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryDto::fromCategory)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if(id == null){
            log.error("Id Catégorie is null");
        }
        List<String> errors = new ArrayList<>();
        List<Product> products = productRepository.findAllByCategoryId(id);

        if(!products.isEmpty()){
            errors.add("Impossible de supprimer une catégorie déja contient des produits");
            throw new InvalidOperationException("Impossible de supprimer une catégorie déja contient des produits", ErrorCodes.CATEGORY_ALREADY_USED, errors);
        }
        categoryRepository.deleteById(id);
    }
}
