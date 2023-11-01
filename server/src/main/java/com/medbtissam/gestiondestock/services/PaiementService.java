package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.PaiementDto;

import java.math.BigDecimal;

public interface PaiementService {


    PaiementDto save(PaiementDto paiementDto);

    Double findAllPaiement();
}
