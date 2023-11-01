/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { VenteService } from './services/vente.service';
import { UtilisateurService } from './services/utilisateur.service';
import { AuthenticationService } from './services/authentication.service';
import { ProductService } from './services/product.service';
import { PhotoService } from './services/photo.service';
import { PaiementService } from './services/paiement.service';
import { NotificationService } from './services/notification.service';
import { MvtStkService } from './services/mvt-stk.service';
import { FournisseurService } from './services/fournisseur.service';
import { CommandeFournisseurService } from './services/commande-fournisseur.service';
import { CommandeClientService } from './services/commande-client.service';
import { ClientService } from './services/client.service';
import { CategorieService } from './services/categorie.service';
import { CartService } from './services/cart.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    VenteService,
    UtilisateurService,
    AuthenticationService,
    ProductService,
    PhotoService,
    PaiementService,
    NotificationService,
    MvtStkService,
    FournisseurService,
    CommandeFournisseurService,
    CommandeClientService,
    ClientService,
    CategorieService,
    CartService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
