/* tslint:disable */
/* eslint-disable */
import { CommandeFournisseurDto } from './commande-fournisseur-dto';
import { ProductDto } from './product-dto';
export interface LigneCommandeFournisseurDto {
  commandeFournisseur?: CommandeFournisseurDto;
  id?: number;
  prixUnitaire?: number;
  productDto?: ProductDto;
  quantite?: number;
}
