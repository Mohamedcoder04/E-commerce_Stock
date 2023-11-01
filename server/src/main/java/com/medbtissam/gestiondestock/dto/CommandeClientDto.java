package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.CommandeClient;
import com.medbtissam.gestiondestock.model.EtatCommande;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data @Builder
public class CommandeClientDto {
    private Integer id;
    private String code;
    private Instant dateCommande;
    private EtatCommande etatCommande;
    private UtilisateurDto utilisateurDto;
    private List<LigneCommandeClientDto> ligneCommandeClients;
    private LivraisonInfoDto livraisonInfoDto;
    private String trackingNumber;
    private PaiementDto paiementDto;


    public static CommandeClientDto fromCommandeClient(CommandeClient commandeClient){
        if(commandeClient == null) throw new RuntimeException("CommandeClient not found!!");

        return CommandeClientDto.builder()
                .id(commandeClient.getId())
                .code(commandeClient.getCode())
                .dateCommande(commandeClient.getDateCommande())
                .etatCommande(commandeClient.getEtatCommande())
                .utilisateurDto(UtilisateurDto.fromEntity(commandeClient.getUtilisateur()))
                .livraisonInfoDto(LivraisonInfoDto.fromLivraisonInfo(commandeClient.getLivraisonInfo()))
                .paiementDto(commandeClient.getPaiement() == null ? null : PaiementDto.fromPaiement(commandeClient.getPaiement()))
                .trackingNumber(commandeClient.getTrackingNumber())
                .build();
    }

    public static CommandeClient toCommandeClient(CommandeClientDto commandeClientDto){
        if(commandeClientDto == null) throw new RuntimeException("CommandeClient not found!!");

        CommandeClient commandeClient = new CommandeClient();
        commandeClient.setId(commandeClientDto.getId());
        commandeClient.setCode(commandeClientDto.getCode());
        commandeClient.setTrackingNumber(commandeClientDto.getTrackingNumber());
        commandeClient.setDateCommande(commandeClientDto.getDateCommande());
        commandeClient.setUtilisateur(UtilisateurDto.toEntity(commandeClientDto.getUtilisateurDto()));
        commandeClient.setEtatCommande(commandeClientDto.getEtatCommande());
        commandeClient.setPaiement(commandeClientDto.getPaiementDto() == null ? null :PaiementDto.toPaiement(commandeClientDto.getPaiementDto()));
        commandeClient.setLivraisonInfo(LivraisonInfoDto.toLivraisonInfo(commandeClientDto.livraisonInfoDto));
        return commandeClient;
    }

    public boolean isCommandeLivree(){
        return etatCommande.LIVREE.equals(this.etatCommande);
    }
}
