package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationRequest;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationResponse;
import com.medbtissam.gestiondestock.services.ClientService;
import com.medbtissam.gestiondestock.services.UtilisateurService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Tag(name = "authentication")
public class AuthenticationController {

    private final UtilisateurService userService;
    private final ClientService clientService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UtilisateurDto dto){
        return ResponseEntity.ok(userService.register(dto));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(userService.authenticate(request));
    }

}