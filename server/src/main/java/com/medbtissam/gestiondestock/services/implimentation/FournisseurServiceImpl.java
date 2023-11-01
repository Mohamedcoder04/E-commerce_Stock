package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.FournisseurDto;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.model.CommandeFournisseur;
import com.medbtissam.gestiondestock.model.Fournisseur;
import com.medbtissam.gestiondestock.repositories.CommandeFournisseurRepository;
import com.medbtissam.gestiondestock.repositories.FournisseurRepository;
import com.medbtissam.gestiondestock.services.FournisseurService;
import com.medbtissam.gestiondestock.validator.FournisseurValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service @Slf4j
public class FournisseurServiceImpl implements FournisseurService {
    private FournisseurRepository fournisseurRepository;
    private CommandeFournisseurRepository commandeFournisseur;
    @Autowired
    public FournisseurServiceImpl(FournisseurRepository fournisseurRepository, CommandeFournisseurRepository commandeFournisseur){
        this.fournisseurRepository= fournisseurRepository;
        this.commandeFournisseur = commandeFournisseur;
    }

    @Override
    public FournisseurDto save(FournisseurDto fournisseurDto) {
        List<String> errors = FournisseurValidator.validate(fournisseurDto);
        if(!errors.isEmpty()){
            log.error("Fournisseur not valid {}", fournisseurDto);
            throw new InvalidEntityException("le Fournisseur "+fournisseurDto+" n'est pas valid ", ErrorCodes.FOURNISSEUR_NOT_VALID, errors);
        }

        Fournisseur fournisseur = fournisseurRepository.save(FournisseurDto.toFournisseur(fournisseurDto));
        FournisseurDto dto = FournisseurDto.fromFournisseur(fournisseur);
        return dto;
    }

    @Override
    public FournisseurDto findById(Integer id) {
        if(id == null){
            log.error("id Fournisseur is null");
            return null;
        }
        Optional<Fournisseur> fournisseur = fournisseurRepository.findById(id);
        FournisseurDto dto  = FournisseurDto.fromFournisseur(fournisseur.get());
        return Optional.of(dto).orElseThrow(
                        ()-> new EntityNotFoundException("aucun Fournisseur n'a l'id "+ id, ErrorCodes.CLIENT_NOT_FOUND)
        );
    }



    @Override
    public List<FournisseurDto> findAll() {
        return fournisseurRepository.findAll().stream()
                .map(FournisseurDto::fromFournisseur)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if(id == null){
            log.error("id Fournisseur is null");
        }
        List<CommandeFournisseur> commandeFournisseurs = commandeFournisseur.findAllByFournisseurId(id);
        if(!commandeFournisseurs.isEmpty()){
            throw new InvalidOperationException("Impossible de supprimer un fournisseur déja avoir des commandefournisseur", ErrorCodes.FOURNISSEUR_ALREADY_USE);
        }
        fournisseurRepository.deleteById(id);
    }

}
