package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.ClientDto;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationRequest;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationResponse;

import java.util.List;

public interface ClientService {

    ClientDto save(ClientDto client);

    ClientDto findById(Integer id);

    ClientDto findByEmail(String email);

    List<ClientDto> findAll();

    AuthenticationResponse register(ClientDto dto);

    AuthenticationResponse authenticate(AuthenticationRequest request);

    void delete(Integer id);

}
