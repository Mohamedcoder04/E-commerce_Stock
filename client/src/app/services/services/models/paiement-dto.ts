/* tslint:disable */
/* eslint-disable */
import { CommandeClientDto } from './commande-client-dto';
export interface PaiementDto {
  cardNumber?: number;
  cardOwner?: string;
  ccv?: number;
  commandeClientDto?: CommandeClientDto;
  id?: number;
  mode?: string;
  montant?: number;
  month?: number;
  statut?: string;
  year?: number;
}
