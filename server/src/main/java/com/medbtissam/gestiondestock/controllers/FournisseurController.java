package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.FournisseurApi;
import com.medbtissam.gestiondestock.dto.FournisseurDto;
import com.medbtissam.gestiondestock.services.FournisseurService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FournisseurController  implements FournisseurApi {

    private final FournisseurService fournisseurService;

    @Override
    public FournisseurDto save(FournisseurDto fournisseurDto) {
        return fournisseurService.save(fournisseurDto);
    }

    @Override
    public FournisseurDto findById(Integer id) {
        return fournisseurService.findById(id);
    }

    @Override
    public List<FournisseurDto> findAll() {
        return fournisseurService.findAll();
    }

    @Override
    public void delete(Integer id) {
        fournisseurService.delete(id);
    }
}
