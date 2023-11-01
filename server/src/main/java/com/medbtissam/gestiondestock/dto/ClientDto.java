package com.medbtissam.gestiondestock.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.medbtissam.gestiondestock.model.Client;
import com.medbtissam.gestiondestock.model.Role;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Embedded;
import java.util.List;

@Data @Builder
public class ClientDto {
    private Integer id;
    private String nom;
    private String prenom;
    private String photo;
    private String email;
    private String telephone;
    private Integer idEntreprise;
    private Role role;
    private String password;
    @Embedded
    private AddressDto adresse;
    @JsonIgnore
    private List<CommandeClientDto> commandeClients;

    public static ClientDto fromClient(Client client){
        if(client == null) throw new RuntimeException("Client not found!!");

        return ClientDto.builder()
                .id(client.getId())
                .nom(client.getNom())
                .prenom(client.getPrenom())
                .photo(client.getPhoto())
                .email(client.getEmail())
                .role(client.getRole())
                .password(client.getPassword())
                .telephone(client.getNumTel())
                .adresse(AddressDto.fromEntity(client.getAdresse()))
                .build();
    }

    public static Client toClient(ClientDto clientDto){
        if(clientDto == null) throw new RuntimeException("Client not found!!");

        Client client = new Client();

        client.setId(clientDto.getId());
        client.setNom(clientDto.getNom());
        client.setPrenom(clientDto.getPrenom());
        client.setPhoto(clientDto.getPhoto());
        client.setPassword(clientDto.getPassword());
        client.setRole(clientDto.getRole());
        client.setEmail(clientDto.getEmail());
        client.setNumTel(clientDto.getTelephone());
        client.setAdresse(AddressDto.toEntity(clientDto.getAdresse()));
        return client;
    }
}
