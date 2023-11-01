/* tslint:disable */
/* eslint-disable */
import { LigneCommandeClientDto } from './ligne-commande-client-dto';
import { LivraisonInfoDto } from './livraison-info-dto';
import { PaiementDto } from './paiement-dto';
import { UtilisateurDto } from './utilisateur-dto';
export interface CommandeClientDto {
  code?: string;
  commandeLivree?: boolean;
  dateCommande?: string;
  etatCommande?: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE';
  id?: number;
  ligneCommandeClients?: Array<LigneCommandeClientDto>;
  livraisonInfoDto?: LivraisonInfoDto;
  paiementDto?: PaiementDto;
  trackingNumber?: string;
  utilisateurDto?: UtilisateurDto;
}
