package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.UtilisateurApi;
import com.medbtissam.gestiondestock.dto.ChangePasswordUtilisatuerDto;
import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import com.medbtissam.gestiondestock.services.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UtilisateurController implements UtilisateurApi {
    private final UtilisateurService utilisateurService;

    @Override
    public UtilisateurDto save(UtilisateurDto utilisateurDto) {
        return utilisateurService.save(utilisateurDto);
    }

    @Override
    public UtilisateurDto findById(Integer id) {
        return utilisateurService.findById(id);
    }

    /*
    @Override
    public UtilisateurDto findByEmail(String email) {
        return utilisateurService.findByEmail(email);
    }
    */

    @Override
    public Integer getNumberUtilisateursByCommandeClients() {
        return utilisateurService.getNumberUtilisateursByCommandeClients();
    }

    @Override
    public List<UtilisateurDto> findAll(String role) {
        return utilisateurService.findAll(role);
    }

    @Override
    public void delete(Integer id) {
        utilisateurService.delete(id);
    }

    @Override
    public UtilisateurDto updatePassword(ChangePasswordUtilisatuerDto dto, Integer id) {
        return utilisateurService.updatePassword(dto, id);
    }
}
