/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { Role } from './role';
export interface ClientDto {
  adresse?: AddressDto;
  email?: string;
  id?: number;
  idEntreprise?: number;
  nom?: string;
  password?: string;
  photo?: string;
  prenom?: string;
  role?: Role;
  telephone?: string;
}
