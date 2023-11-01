/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CommandeFournisseurDto } from '../models/commande-fournisseur-dto';
import { LigneCommandeFournisseurDto } from '../models/ligne-commande-fournisseur-dto';

@Injectable({
  providedIn: 'root',
})
export class CommandeFournisseurService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save6
   */
  static readonly Save6Path = '/commandes-fournisseur/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save6$Response(params: {
    body: CommandeFournisseurDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeFournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.Save6Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save6(params: {
    body: CommandeFournisseurDto
  },
  context?: HttpContext

): Observable<CommandeFournisseurDto> {

    return this.save6$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeFournisseurDto>) => r.body as CommandeFournisseurDto)
    );
  }

  /**
   * Path part for operation updateQuantity
   */
  static readonly UpdateQuantityPath = '/commandes-fournisseur/updatequantite/{idCommandeFournisseur}/{idLigneCommandeFournisseur}/{quantite}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateQuantity()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateQuantity$Response(params: {
    idCommandeFournisseur: number;
    idLigneCommandeFournisseur: number;
    quantite: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeFournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.UpdateQuantityPath, 'patch');
    if (params) {
      rb.path('idCommandeFournisseur', params.idCommandeFournisseur, {});
      rb.path('idLigneCommandeFournisseur', params.idLigneCommandeFournisseur, {});
      rb.path('quantite', params.quantite, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateQuantity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateQuantity(params: {
    idCommandeFournisseur: number;
    idLigneCommandeFournisseur: number;
    quantite: number;
  },
  context?: HttpContext

): Observable<CommandeFournisseurDto> {

    return this.updateQuantity$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeFournisseurDto>) => r.body as CommandeFournisseurDto)
    );
  }

  /**
   * Path part for operation updateArticle
   */
  static readonly UpdateArticlePath = '/commandes-fournisseur/updatearticle/{idCommandeFournisseur}/{idLigneCommandeFournisseur}/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArticle$Response(params: {
    idCommandeFournisseur: number;
    idLigneCommandeFournisseur: number;
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeFournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.UpdateArticlePath, 'patch');
    if (params) {
      rb.path('idCommandeFournisseur', params.idCommandeFournisseur, {});
      rb.path('idLigneCommandeFournisseur', params.idLigneCommandeFournisseur, {});
      rb.path('idArticle', params.idArticle, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArticle(params: {
    idCommandeFournisseur: number;
    idLigneCommandeFournisseur: number;
    idArticle: number;
  },
  context?: HttpContext

): Observable<CommandeFournisseurDto> {

    return this.updateArticle$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeFournisseurDto>) => r.body as CommandeFournisseurDto)
    );
  }

  /**
   * Path part for operation updateEtatCommandeFournisseur
   */
  static readonly UpdateEtatCommandeFournisseurPath = '/commandes-fournisseur/updatearticle/{idCommandeFournisseur}/{etatCommande}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateEtatCommandeFournisseur()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateEtatCommandeFournisseur$Response(params: {
    idCommandeFournisseur: number;
    etatCommande: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE';
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeFournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.UpdateEtatCommandeFournisseurPath, 'patch');
    if (params) {
      rb.path('idCommandeFournisseur', params.idCommandeFournisseur, {});
      rb.path('etatCommande', params.etatCommande, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateEtatCommandeFournisseur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateEtatCommandeFournisseur(params: {
    idCommandeFournisseur: number;
    etatCommande: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE';
  },
  context?: HttpContext

): Observable<CommandeFournisseurDto> {

    return this.updateEtatCommandeFournisseur$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeFournisseurDto>) => r.body as CommandeFournisseurDto)
    );
  }

  /**
   * Path part for operation findByReference
   */
  static readonly FindByReferencePath = '/commandes-fournisseur/{referenceCommandeClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByReference()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByReference$Response(params: {
    referenceCommandeClient: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeFournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.FindByReferencePath, 'get');
    if (params) {
      rb.path('referenceCommandeClient', params.referenceCommandeClient, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByReference$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByReference(params: {
    referenceCommandeClient: string;
  },
  context?: HttpContext

): Observable<CommandeFournisseurDto> {

    return this.findByReference$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeFournisseurDto>) => r.body as CommandeFournisseurDto)
    );
  }

  /**
   * Path part for operation findById5
   */
  static readonly FindById5Path = '/commandes-fournisseur/{idCommandeClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById5()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById5$Response(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeFournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.FindById5Path, 'get');
    if (params) {
      rb.path('idCommandeClient', params.idCommandeClient, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById5(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<CommandeFournisseurDto> {

    return this.findById5$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeFournisseurDto>) => r.body as CommandeFournisseurDto)
    );
  }

  /**
   * Path part for operation delete5
   */
  static readonly Delete5Path = '/commandes-fournisseur/{idCommandeClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete5()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5$Response(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.Delete5Path, 'delete');
    if (params) {
      rb.path('idCommandeClient', params.idCommandeClient, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.delete5$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation findAllLigneCommande
   */
  static readonly FindAllLigneCommandePath = '/commandes-fournisseur/lignescommande/{idCommande}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLigneCommande()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLigneCommande$Response(params: {
    idCommande: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<LigneCommandeFournisseurDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.FindAllLigneCommandePath, 'get');
    if (params) {
      rb.path('idCommande', params.idCommande, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LigneCommandeFournisseurDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLigneCommande$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLigneCommande(params: {
    idCommande: number;
  },
  context?: HttpContext

): Observable<Array<LigneCommandeFournisseurDto>> {

    return this.findAllLigneCommande$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<LigneCommandeFournisseurDto>>) => r.body as Array<LigneCommandeFournisseurDto>)
    );
  }

  /**
   * Path part for operation findAll5
   */
  static readonly FindAll5Path = '/commandes-fournisseur/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll5()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll5$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CommandeFournisseurDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.FindAll5Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommandeFournisseurDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll5(params?: {
  },
  context?: HttpContext

): Observable<Array<CommandeFournisseurDto>> {

    return this.findAll5$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CommandeFournisseurDto>>) => r.body as Array<CommandeFournisseurDto>)
    );
  }

  /**
   * Path part for operation deleteArticle
   */
  static readonly DeleteArticlePath = '/commandes-fournisseur/deletearticle/{idCommandeFournisseur}/{idLigneCommandeFournisseur}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle$Response(params: {
    idCommandeFournisseur: number;
    idLigneCommandeFournisseur: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeFournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeFournisseurService.DeleteArticlePath, 'delete');
    if (params) {
      rb.query('idCommandeFournisseur', params.idCommandeFournisseur, {});
      rb.query('idLigneCommandeFournisseur', params.idLigneCommandeFournisseur, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeFournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: {
    idCommandeFournisseur: number;
    idLigneCommandeFournisseur: number;
  },
  context?: HttpContext

): Observable<CommandeFournisseurDto> {

    return this.deleteArticle$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeFournisseurDto>) => r.body as CommandeFournisseurDto)
    );
  }

}
