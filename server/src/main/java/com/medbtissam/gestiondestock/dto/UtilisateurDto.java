package com.medbtissam.gestiondestock.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.medbtissam.gestiondestock.model.Role;
import com.medbtissam.gestiondestock.model.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Email;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class UtilisateurDto {

    private Integer id;

    private String prenom;

    private String nom;

    @Email(message = "this mail already exist")
    private String email;

    private Role role;

    private String password;
    private String telephone;

    private String photo;

    private LocalDate dateDeNaissance;
    @JsonIgnore
    private boolean active;

    private AddressDto address;

    public static UtilisateurDto fromEntity(Utilisateur user){
        return UtilisateurDto.builder()
                .id(user.getId())
                .prenom(user.getFirstName())
                .nom(user.getLastName())
                .email(user.getEmail())
                .photo(user.getPhoto())
                .password(user.getPassword())
                .active(user.isActive())
                .role(user.getRole())
                .telephone(user.getTelephone())
                .address(user.getAdress() == null ? null : AddressDto.fromEntity(user.getAdress()))
                .build();
    }

    public static Utilisateur toEntity(UtilisateurDto user){
        return Utilisateur.builder()
                .id(user.getId())
                .firstName(user.getPrenom())
                .lastName(user.getNom())
                .adress(AddressDto.toEntity(user.getAddress()))
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .active(user.isActive())
                .photo(user.getPhoto())
                .telephone(user.telephone)
                .password(user.getPassword())
                .build();
    }
}
