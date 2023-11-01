/* tslint:disable */
/* eslint-disable */
import { ProductDto } from './product-dto';
export interface MvtStkDto {
  dateMvt?: string;
  id?: number;
  productDto?: ProductDto;
  quantite?: number;
  sourceMvtStk?: 'COMMANDE_CLIENT' | 'COMMANDT_FOURNISSEUR' | 'VENTE';
  typeMvt?: 'ENTREE' | 'SORTIE' | 'CORRECTION_POS' | 'CORRECTION_NEG';
}
