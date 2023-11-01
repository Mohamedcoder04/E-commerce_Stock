package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.CommandeFournisseur;
import com.medbtissam.gestiondestock.model.EtatCommande;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data @Builder
public class CommandeFournisseurDto {
    private Integer id;
    private String code;
    private Instant dateCommande;
    private FournisseurDto fournisseur;
    private List<LigneCommandeFournisseurDto> ligneCommandeFournisseurs;

    private EtatCommande etatCommande;

    public static CommandeFournisseurDto fromCommandeFournisseur(CommandeFournisseur commandeFournisseur){
        if(commandeFournisseur == null) throw new RuntimeException("commandeFournisseur not found!!");

        return CommandeFournisseurDto.builder()
                .id(commandeFournisseur.getId())
                .code(commandeFournisseur.getCode())
                .dateCommande(commandeFournisseur.getDateCommande())
                .fournisseur(FournisseurDto.fromFournisseur(commandeFournisseur.getFournisseur()))
                .etatCommande(commandeFournisseur.getEtatCommande())
                .build();
    }

    public static CommandeFournisseur toCommandeFournisseur(CommandeFournisseurDto dto){
        if(dto == null) throw new RuntimeException("commandeFournisseur not found!!");

        CommandeFournisseur commandeFournisseur = new CommandeFournisseur();
        commandeFournisseur.setId(dto.getId());
        commandeFournisseur.setCode(dto.getCode());
        commandeFournisseur.setDateCommande(dto.getDateCommande());
        commandeFournisseur.setFournisseur(FournisseurDto.toFournisseur(dto.getFournisseur()));
        commandeFournisseur.setEtatCommande(dto.getEtatCommande());
        return commandeFournisseur;
    }

    public boolean isCommandeLivree(){
        return EtatCommande.LIVREE.equals(this.etatCommande);
    }
}
