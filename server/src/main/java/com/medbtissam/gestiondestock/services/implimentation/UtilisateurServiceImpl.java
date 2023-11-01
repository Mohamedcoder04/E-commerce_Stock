package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.ChangePasswordUtilisatuerDto;
import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationRequest;
import com.medbtissam.gestiondestock.dto.auth.AuthenticationResponse;
import com.medbtissam.gestiondestock.model.Role;
import com.medbtissam.gestiondestock.model.Utilisateur;
import com.medbtissam.gestiondestock.repositories.ClientRepository;
import com.medbtissam.gestiondestock.repositories.RoleRepository;
import com.medbtissam.gestiondestock.repositories.TokenRepository;
import com.medbtissam.gestiondestock.repositories.UtilisateurRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.UtilisateurService;
import com.medbtissam.gestiondestock.utils.JwtUtils;
import com.medbtissam.gestiondestock.validator.UtilisateurValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private static final String ROLE_USER = "ROLE_CLIENT";
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final ClientRepository clientRepository;


    @Override
    public UtilisateurDto save(UtilisateurDto utilisateurDto) {
        List<String> errors = UtilisateurValidator.validate(utilisateurDto);
        if (!errors.isEmpty()) {
            log.error("User not valid {}", utilisateurDto);
            throw new InvalidEntityException("utilisateur n'est pas valide ", ErrorCodes.UTILISATEUR_NOT_VALID, errors);
        }
        if(isUserExist(utilisateurDto)){
            Utilisateur utilisateur = utilisateurRepository.save(UtilisateurDto.toEntity(utilisateurDto));
            return UtilisateurDto.fromEntity(utilisateur);
        }
        utilisateurDto.setActive(true);
        Role role_user = findOrCreateRole("ROLE_USER");
        utilisateurDto.setPassword(passwordEncoder.encode(utilisateurDto.getPassword()));
        utilisateurDto.setRole(role_user);
        Utilisateur utilisateur = utilisateurRepository.save(UtilisateurDto.toEntity(utilisateurDto));
        return UtilisateurDto.fromEntity(utilisateur);
    }

    private boolean isUserExist(UtilisateurDto utilisateurDto){
        Optional<Utilisateur> utilisateurByEmail = utilisateurRepository.findUtilisateurByEmail(utilisateurDto.getEmail());
        return utilisateurByEmail.isPresent();
    }

    @Override
    public UtilisateurDto findById(Integer id) {
        if (id == null) {
            log.error("id user is null");
            return null;
        }
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);

        return Optional.of(UtilisateurDto.fromEntity(utilisateur.get())).orElseThrow(
                () -> new EntityNotFoundException("aucun utilisateur n'a l'id " + id, ErrorCodes.UTILISATEUR_NOT_FOUND)
        );
    }

    @Override
    public UtilisateurDto findByEmail(String email) {
        if (!StringUtils.hasLength(email)) {
            log.error("email user is null");
            throw new InvalidEntityException("email que vous avez saisi est null", ErrorCodes.UTILISATEUR_NOT_FOUND);
        }
        Optional<Utilisateur> utilisateur = utilisateurRepository.findUtilisateurByEmail(email);

        return Optional.of(UtilisateurDto.fromEntity(utilisateur.get())).orElseThrow(
                () -> new EntityNotFoundException("aucun utilisateur n'a cet email " + email, ErrorCodes.UTILISATEUR_NOT_FOUND)
        );
    }

    @Override
    public List<UtilisateurDto> findAll(String role) {
        return utilisateurRepository.findUtilisateursByRole(role).stream()
                .map(UtilisateurDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("id user is null");
        }
        utilisateurRepository.deleteById(id);
    }

    @Override
    public UtilisateurDto updatePassword(ChangePasswordUtilisatuerDto dto, Integer id) {
        Utilisateur utilisateur = UtilisateurDto.toEntity(validateUtilisateur(dto, id));

        utilisateur.setPassword(passwordEncoder.encode(dto.getMotDePasse()));
        utilisateur.setActive(true);

        return UtilisateurDto.fromEntity(
                utilisateurRepository.save(utilisateur)
        );
    }


    private UtilisateurDto validateUtilisateur(ChangePasswordUtilisatuerDto dto, Integer id) {
        UtilisateurDto utilisateurDto = findById(id);
        List<String> errors = new ArrayList<>();
        if (!StringUtils.hasLength(dto.getMotDePasse()) || !StringUtils.hasLength(dto.getConfirmMotDePasse())) {
            errors.add("Mot de passe est null");
            throw new InvalidOperationException("Impossible de modifier le mot de passe avec un mot de passe null", ErrorCodes.UTILISATEUR_CHANGE_PASSWORD_NULL, errors);
        }

        boolean is = verifyPassword(dto.getAncienMotDePasse(), utilisateurDto.getPassword());
        System.out.println(is);
        if (!is) {
            errors.add("l'ancien mot de passe est incorrect");
            throw new InvalidOperationException("votre ancien mot de passe est incorrect", ErrorCodes.UTILISATEUR_CHANGE_OLD_PASSWORD_INVALID, errors);
        }
        if (!dto.getMotDePasse().equals(dto.getConfirmMotDePasse())) {
            errors.add("Les mot de passes non conformes");
            throw new InvalidOperationException("Impossible de modifier le mot de passe avec des mot de passes non conformes", ErrorCodes.UTILISATEUR_CHANGE_PASSWORD_NULL, errors);
        }
        return utilisateurDto;
    }

    private boolean verifyPassword(String enteredPassword, String encodedPassword) {
        return passwordEncoder.matches(enteredPassword, encodedPassword);
    }

    @Override
    @Transactional
    public AuthenticationResponse register(UtilisateurDto dto) {
        List<String> errors = UtilisateurValidator.validate(dto);
        if (!errors.isEmpty()) {
            log.error("Utilisateur not valid {}", dto);
            throw new InvalidEntityException("L'utilisateur n'est pas valide", ErrorCodes.UTILISATEUR_NOT_VALID, errors);
        }
        Utilisateur user = UtilisateurDto.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(findOrCreateRole(ROLE_USER));
        user.setActive(true);
        var savedUser = utilisateurRepository.save(user);
        String jwt = jwtUtils.generateToken(savedUser);
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

    @Override
    public Integer getNumberUtilisateursByCommandeClients() {
        return utilisateurRepository.getNumberUtilisateursByCommandeClients();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        final Utilisateur savedUser = utilisateurRepository.findUtilisateurByEmail(request.getEmail()).get();

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", savedUser.getId());
        claims.put("fullName", savedUser.getFirstName() + " " + savedUser.getLastName());
        String jwt = jwtUtils.generateToken(savedUser, claims);
        return AuthenticationResponse.builder()
                .accessToken(jwt)
                .build();
    }
    /*
    private AuthenticationResponse getAuthenticationResponse(Utilisateur savedUser) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", savedUser.getId());
        claims.put("fullName", savedUser.getFirstName() + " " + savedUser.getLastName());
        String jwt = jwtUtils.generateToken(savedUser, claims);

        revokAllUserTokens(savedUser);
        var token = Token.builder()
                .user(savedUser)
                .token(jwt)
                .expired(false)
                .invoked(false)
                .build();
        tokenRepository.save(token);

        return AuthenticationResponse.builder()
                .accessToken(jwt)
                .build();
    }

    private void revokAllUserTokens(Utilisateur user){
        var validToken = tokenRepository.findAllValidTokensByUser(user.getId());
        if(validToken.isEmpty()){
            return;
        }
        validToken.forEach(token -> {
            token.setExpired(true);
            token.setInvoked(true);
        });
        tokenRepository.saveAll(validToken);
    }

     */


}
