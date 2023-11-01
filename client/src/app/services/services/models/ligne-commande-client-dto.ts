/* tslint:disable */
/* eslint-disable */
import { CommandeClientDto } from './commande-client-dto';
import { ProductDto } from './product-dto';
export interface LigneCommandeClientDto {
  commandeClient?: CommandeClientDto;
  id?: number;
  idEntreprise?: number;
  prixUnitaire?: number;
  productDto?: ProductDto;
  quantite?: number;
}
