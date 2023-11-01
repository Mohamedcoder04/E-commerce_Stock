/* tslint:disable */
/* eslint-disable */
import { ProductDto } from './product-dto';
import { UtilisateurDto } from './utilisateur-dto';
export interface CartDto {
  id?: number;
  product?: ProductDto;
  quantity?: number;
  utilisateurDto?: UtilisateurDto;
}
