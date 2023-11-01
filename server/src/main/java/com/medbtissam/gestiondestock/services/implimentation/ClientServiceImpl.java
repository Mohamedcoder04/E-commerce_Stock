package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.ClientDto;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationRequest;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationResponse;
import com.medbtissam.gestiondestock.model.Role;
import com.medbtissam.gestiondestock.repositories.RoleRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.model.Client;
import com.medbtissam.gestiondestock.model.CommandeClient;
import com.medbtissam.gestiondestock.repositories.ClientRepository;
import com.medbtissam.gestiondestock.repositories.CommandeClientRepository;
import com.medbtissam.gestiondestock.services.ClientService;
import com.medbtissam.gestiondestock.utils.JwtUtils;
import com.medbtissam.gestiondestock.validator.ClientValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service @Slf4j
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final CommandeClientRepository commandeClientRepository;
    private final AuthenticationManager authenticationManager;
    private static final String ROLE_CLIENT = "ROLE_CLIENT";
    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;
    private final RoleRepository roleRepository;


    @Override
    public ClientDto save(ClientDto clientDto) {
        List<String> errors = ClientValidator.validate(clientDto);
        if(!errors.isEmpty()){
            log.error("Client not valid {}", clientDto);
            throw new InvalidEntityException("le Client "+clientDto+" n'est pas valid ", ErrorCodes.CLIENT_NOT_VALID, errors);
        }

        Client client = clientRepository.save(ClientDto.toClient(clientDto));
        ClientDto dto = ClientDto.fromClient(client);
        return dto;
    }

    @Override
    public ClientDto findById(Integer id) {
        if(id == null){
            log.error("l'id client is null");
            return null;
        }
        Optional<Client> client = clientRepository.findById(id);
        ClientDto dto  = ClientDto.fromClient(client.get());
        return Optional.of(dto).orElseThrow(
                        ()-> new EntityNotFoundException("aucun client n'a l'id "+ id, ErrorCodes.CLIENT_NOT_FOUND)
        );
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        final Client savedClient = clientRepository.findByEmail(request.getEmail()).get();

        Map<String, Object> claims = new HashMap<>();
        claims.put("clientId", savedClient.getId());
        claims.put("fullName", savedClient.getPrenom() + " " + savedClient.getNom());
        String jwt = jwtUtils.generateToken(savedClient, claims);
        return AuthenticationResponse.builder()
                .accessToken(jwt)
                .build();
    }

    @Override
    public ClientDto findByEmail(String email) {
        if(!StringUtils.hasLength(email)){
            log.error("l'email du client is null");
            return null;
        }
        Optional<Client> client = clientRepository.findByEmail(email);
        return Optional.of(ClientDto.fromClient(client.get())).orElseThrow(
                ()-> new EntityNotFoundException("aucun client n'a l'email "+email, ErrorCodes.CLIENT_NOT_FOUND)
        );
    }


    @Override
    public List<ClientDto> findAll() {
        return clientRepository.findAll().stream()
                .map(ClientDto::fromClient)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if(id == null){
            log.error("l'id client is null");
        }
        List<CommandeClient> commandeClients = commandeClientRepository.findAllCommandeClientByUtilisateurIdOrderByIdDesc(id);
        if(!commandeClients.isEmpty()){
            throw new InvalidOperationException("Impossible de supprimer un client qui a déjà des commandes", ErrorCodes.CLIENT_ALREADY_USE);
        }
        clientRepository.deleteById(id);
    }

    @Override
    @Transactional
    public AuthenticationResponse register(ClientDto dto) {
        List<String> errors = ClientValidator.validate(dto);
        if (!errors.isEmpty()) {
            log.error("Client not valid {}", dto);
            throw new InvalidEntityException("Le client n'est pas valide", ErrorCodes.UTILISATEUR_NOT_VALID, errors);
        }
        Client client = ClientDto.toClient(dto);
        client.setPassword(passwordEncoder.encode(dto.getPassword()));
        client.setRole(findOrCreateRole(ROLE_CLIENT));
        client.setActive(true);
        var savedClient = clientRepository.save(client);
        String jwt = jwtUtils.generateToken(savedClient);
        return AuthenticationResponse.builder()
                .accessToken(jwt)
                .build();
    }


    private Role findOrCreateRole(String roleName) {
        Role role = roleRepository.findByRoleName(roleName).orElse(null);
        if (role == null) {
            return roleRepository.save(Role.builder()
                    .roleName(roleName)
                    .build());
        }
        return role;
    }

}
