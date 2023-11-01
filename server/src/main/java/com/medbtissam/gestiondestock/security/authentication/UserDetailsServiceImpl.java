package com.medbtissam.gestiondestock.security.authentication;

import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UtilisateurRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findUtilisateurByEmail(email).orElseThrow(
                ()-> new EntityNotFoundException("Email et/ou Mot de passe incorrecte ")
        );
    }
}
