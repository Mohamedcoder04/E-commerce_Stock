package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.CommandeClientDto;
import com.medbtissam.gestiondestock.dto.PaiementDto;
import com.medbtissam.gestiondestock.model.Paiement;
import com.medbtissam.gestiondestock.repositories.CommandeClientRepository;
import com.medbtissam.gestiondestock.repositories.PaiementRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.services.CommandeClientService;
import com.medbtissam.gestiondestock.services.PaiementService;
import com.medbtissam.gestiondestock.validator.PaiementValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaiementServiceImpl implements PaiementService {

    public final PaiementRepository paiementRepository;
    public final CommandeClientService commandeClientService;

    public final CommandeClientRepository commandeClientRepository;

    @Override
    @Transactional
    public PaiementDto save(PaiementDto paiementDto) {

        List<String> errors = PaiementValidator.validate(paiementDto);
        if (!errors.isEmpty()) {
            throw new InvalidEntityException("le paiement n'est pas valid", ErrorCodes.PAIEMENT_NOT_VALID, errors);
        }
        CommandeClientDto commandeClientDto = paiementDto.getCommandeClientDto();


        // Sauvegarder la CommandeClient en premier
        CommandeClientDto savedCommandeClientDto = commandeClientService.save(commandeClientDto);

        // Affecter la CommandeClient sauvegardée au Paiement
        Paiement paiement = PaiementDto.toPaiement(paiementDto);
        paiement.setCommandeClient(CommandeClientDto.toCommandeClient(savedCommandeClientDto));

        Paiement savedPaiement = paiementRepository.save(paiement);
        return PaiementDto.fromPaiement(savedPaiement);


    }

    @Override
    public Double findAllPaiement() {
        return paiementRepository.findSumAllPaiements();
    }
}
