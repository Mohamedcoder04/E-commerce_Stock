package com.medbtissam.gestiondestock.security.authentication;

import com.medbtissam.gestiondestock.repositories.ClientRepository;
import com.medbtissam.gestiondestock.repositories.UtilisateurRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

//@Service
public class ClientDetailsServiceImpl  extends UserDetailsServiceImpl {
    @Autowired
    private ClientRepository repository;

    public ClientDetailsServiceImpl(UtilisateurRepository repository) {
        super(repository);
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repository.findByEmail(email).orElseThrow(
                ()-> new EntityNotFoundException("Client not found")
        );
    }
}
