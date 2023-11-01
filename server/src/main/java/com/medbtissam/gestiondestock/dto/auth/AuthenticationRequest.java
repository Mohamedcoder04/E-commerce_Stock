package com.medbtissam.gestiondestock.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
public class AuthenticationRequest {
    private String email;
    private String password;
}
