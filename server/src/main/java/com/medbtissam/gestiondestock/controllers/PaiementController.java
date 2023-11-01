package com.medbtissam.gestiondestock.controllers;


import com.medbtissam.gestiondestock.controllers.api.PaiementApi;
import com.medbtissam.gestiondestock.dto.PaiementDto;
import com.medbtissam.gestiondestock.services.PaiementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaiementController implements PaiementApi {
    public final PaiementService paiementService;

    @Override
    public ResponseEntity<PaiementDto> save(PaiementDto paiementDto) {
        return ResponseEntity.ok(paiementService.save(paiementDto));
    }

    @Override
    public Double findSumAllPaiements() {
        return paiementService.findAllPaiement();
    }
}
