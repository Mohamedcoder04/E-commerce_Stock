/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { Role } from './role';
export interface UtilisateurDto {
  address?: AddressDto;
  dateDeNaissance?: string;
  email?: string;
  id?: number;
  nom?: string;
  password?: string;
  photo?: string;
  prenom?: string;
  role?: Role;
  telephone?: string;
}
