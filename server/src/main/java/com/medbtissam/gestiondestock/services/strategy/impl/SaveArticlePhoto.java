package com.medbtissam.gestiondestock.services.strategy.impl;

import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.ProductService;
import com.medbtissam.gestiondestock.services.FlickService;
import com.medbtissam.gestiondestock.services.strategy.Strategy;
import com.flickr4java.flickr.FlickrException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.InputStream;

@Service("articleStrategy")
@Slf4j
public class SaveArticlePhoto implements Strategy<ProductDto> {
    private FlickService flickService;
    private ProductService productService;

    @Autowired
    public SaveArticlePhoto(FlickService flickService, ProductService productService) {
        this.flickService = flickService;
        this.productService = productService;
    }

    @Override
    public ProductDto savePhoto(Integer id, InputStream photo, String titre) throws FlickrException {
        ProductDto productDto = productService.findById(id);
        String urlPhoto = flickService.savePhoto(photo, titre);
        if(!StringUtils.hasLength(urlPhoto)){
            throw new InvalidOperationException("Erreur lors de l'enregistrement de photo de l'article", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
        }
        productDto.setPhoto(urlPhoto);
        return productService.save(productDto);
    }
}
