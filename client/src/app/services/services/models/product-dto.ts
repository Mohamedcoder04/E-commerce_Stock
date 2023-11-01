/* tslint:disable */
/* eslint-disable */
import { CategoryDto } from './category-dto';
export interface ProductDto {
  available?: boolean;
  category?: CategoryDto;
  codeProduit?: string;
  designation?: string;
  id?: number;
  numberSell?: number;
  photo?: string;
  prixUnitaireHt?: number;
  prixUnitaireTtc?: number;
  promo?: boolean;
  quantity?: number;
  selected?: boolean;
  tauxTva?: number;
}
