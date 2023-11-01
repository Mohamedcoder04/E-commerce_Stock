package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.ClientApi;
import com.medbtissam.gestiondestock.dto.ClientDto;
import com.medbtissam.gestiondestock.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ClientController implements ClientApi {
    private final ClientService clientService;

    @Override
    public ClientDto save(ClientDto clientDto) {
        return clientService.save(clientDto);
    }

    @Override
    public ClientDto findById(Integer id) {
        return clientService.findById(id);
    }

    @Override
    public ClientDto findByEmail(String email) {
        return clientService.findByEmail(email);
    }

    @Override
    public List<ClientDto> findAll() {
        return clientService.findAll();
    }

    @Override
    public void delete(Integer id) {
        clientService.delete(id);
    }
}
