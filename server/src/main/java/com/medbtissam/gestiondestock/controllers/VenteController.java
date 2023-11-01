package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.VenteApi;
import com.medbtissam.gestiondestock.dto.VenteDto;
import com.medbtissam.gestiondestock.services.VenteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VenteController implements VenteApi {
    private final VenteService venteService;

    @Override
    public VenteDto save(VenteDto venteDto) {
        return venteService.save(venteDto);
    }

    @Override
    public VenteDto findById(Integer id) {
        return venteService.findById(id);
    }

    @Override
    public VenteDto findByCode(String code) {
        return venteService.findByCode(code);
    }

    @Override
    public List<VenteDto> findAll() {
        return venteService.findAll();
    }

    @Override
    public void delete(Integer id) {
        venteService.delete(id);
    }
}
