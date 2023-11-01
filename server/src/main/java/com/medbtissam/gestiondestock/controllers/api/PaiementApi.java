package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.PaiementDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;

@Tag( name = "paiement")
@RequestMapping("/paiements")
public interface PaiementApi {

    @PostMapping("/")
    ResponseEntity<PaiementDto> save(@RequestBody PaiementDto paiementDto);

    @GetMapping("/total")
    Double findSumAllPaiements();
}
