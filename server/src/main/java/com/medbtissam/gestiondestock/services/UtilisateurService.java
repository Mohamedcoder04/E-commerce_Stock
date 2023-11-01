package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.ChangePasswordUtilisatuerDto;
import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationRequest;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationResponse;

import java.util.List;

public interface UtilisateurService {
    UtilisateurDto save(UtilisateurDto utilisateurDto);
    UtilisateurDto findById(Integer id);
    UtilisateurDto findByEmail(String email);
    List<UtilisateurDto> findAll(String role);
    void delete(Integer id);

    UtilisateurDto updatePassword(ChangePasswordUtilisatuerDto dto, Integer id);

    AuthenticationResponse register(UtilisateurDto dto);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    Integer getNumberUtilisateursByCommandeClients();
}
