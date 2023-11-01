package com.medbtissam.gestiondestock.services.strategy.impl;

import com.medbtissam.gestiondestock.dto.FournisseurDto;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.FlickService;
import com.medbtissam.gestiondestock.services.FournisseurService;
import com.medbtissam.gestiondestock.services.strategy.Strategy;
import com.flickr4java.flickr.FlickrException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.InputStream;

@Service("fournisseurStrategy")
@Slf4j
public class SaveFournisseurPhoto implements Strategy<FournisseurDto> {
    private FlickService flickService;
    private FournisseurService fournisseurService;

    @Autowired
    public SaveFournisseurPhoto(FlickService flickService, FournisseurService fournisseurService) {
        this.flickService = flickService;
        this.fournisseurService = fournisseurService;
    }

    @Override
    public FournisseurDto savePhoto(Integer id, InputStream photo, String titre) throws FlickrException {
        FournisseurDto fournisseurDto = fournisseurService.findById(id);
        String urlPhoto = flickService.savePhoto(photo, titre);
        if(!StringUtils.hasLength(urlPhoto)){
            throw new InvalidOperationException("", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
        }
        fournisseurDto.setPhoto(urlPhoto);
        return fournisseurService.save(fournisseurDto);
    }
}
