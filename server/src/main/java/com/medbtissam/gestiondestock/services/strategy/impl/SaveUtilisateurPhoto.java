package com.medbtissam.gestiondestock.services.strategy.impl;

import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.FlickService;
import com.medbtissam.gestiondestock.services.UtilisateurService;
import com.medbtissam.gestiondestock.services.strategy.Strategy;
import com.flickr4java.flickr.FlickrException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.InputStream;

@Service("utilisateurStrategy")
@Slf4j
public class SaveUtilisateurPhoto implements Strategy<UtilisateurDto> {
    private FlickService flickService;
    private UtilisateurService utilisateurService;

    @Autowired
    public SaveUtilisateurPhoto(FlickService flickService, UtilisateurService utilisateurService) {
        this.flickService = flickService;
        this.utilisateurService = utilisateurService;
    }

    @Override
    public UtilisateurDto savePhoto(Integer id, InputStream photo, String titre) throws FlickrException {
        UtilisateurDto utilisateurDto = utilisateurService.findById(id);
        String urlPhoto = flickService.savePhoto(photo, titre);
        if(!StringUtils.hasLength(urlPhoto)){
            throw new InvalidOperationException("", ErrorCodes.UPDATE_PHOTO_EXCEPTION);
        }
        utilisateurDto.setPhoto(urlPhoto);
        return utilisateurService.save(utilisateurDto);
    }
}
