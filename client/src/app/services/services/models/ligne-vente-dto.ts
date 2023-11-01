/* tslint:disable */
/* eslint-disable */
import { ProductDto } from './product-dto';
import { VenteDto } from './vente-dto';
export interface LigneVenteDto {
  article?: ProductDto;
  id?: number;
  idEntreprise?: number;
  prixUnitaire?: number;
  quantite?: number;
  vente?: VenteDto;
}
