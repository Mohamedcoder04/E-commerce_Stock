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

import { CommandeClientDto } from '../models/commande-client-dto';
import { LigneCommandeClientDto } from '../models/ligne-commande-client-dto';

@Injectable({
  providedIn: 'root',
})
export class CommandeClientService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save7
   */
  static readonly Save7Path = '/commandes-client/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save7$Response(params: {
    body: CommandeClientDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.Save7Path, 'post');
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
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save7(params: {
    body: CommandeClientDto
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.save7$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

  /**
   * Path part for operation updateQuantiteCommandee
   */
  static readonly UpdateQuantiteCommandeePath = '/commandes-client/updatequantitecommande/{idCommande}/{idLigneCommande}/{quantite}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateQuantiteCommandee()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateQuantiteCommandee$Response(params: {
    idCommande: number;
    idLigneCommande: number;
    quantite: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.UpdateQuantiteCommandeePath, 'patch');
    if (params) {
      rb.path('idCommande', params.idCommande, {});
      rb.path('idLigneCommande', params.idLigneCommande, {});
      rb.path('quantite', params.quantite, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateQuantiteCommandee$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateQuantiteCommandee(params: {
    idCommande: number;
    idLigneCommande: number;
    quantite: number;
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.updateQuantiteCommandee$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

  /**
   * Path part for operation updateEtatCommandeClient
   */
  static readonly UpdateEtatCommandeClientPath = '/commandes-client/updateetatcommande/{idCommande}/{etatCommande}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateEtatCommandeClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateEtatCommandeClient$Response(params: {
    idCommande: number;
    etatCommande: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE';
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.UpdateEtatCommandeClientPath, 'patch');
    if (params) {
      rb.path('idCommande', params.idCommande, {});
      rb.path('etatCommande', params.etatCommande, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateEtatCommandeClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateEtatCommandeClient(params: {
    idCommande: number;
    etatCommande: 'EN_PREPARATION' | 'VALIDEE' | 'LIVREE';
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.updateEtatCommandeClient$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

  /**
   * Path part for operation updateClient
   */
  static readonly UpdateClientPath = '/commandes-client/updateclient/{idCommande}/{idClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateClient$Response(params: {
    idCommande: number;
    idClient: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.UpdateClientPath, 'patch');
    if (params) {
      rb.path('idCommande', params.idCommande, {});
      rb.path('idClient', params.idClient, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateClient(params: {
    idCommande: number;
    idClient: number;
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.updateClient$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

  /**
   * Path part for operation updateArticle1
   */
  static readonly UpdateArticle1Path = '/commandes-client/updatearticle/{idCommande}/{idLigneCommande}/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticle1()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArticle1$Response(params: {
    idCommande: number;
    idLigneCommande: number;
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.UpdateArticle1Path, 'patch');
    if (params) {
      rb.path('idCommande', params.idCommande, {});
      rb.path('idLigneCommande', params.idLigneCommande, {});
      rb.path('idArticle', params.idArticle, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArticle1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArticle1(params: {
    idCommande: number;
    idLigneCommande: number;
    idArticle: number;
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.updateArticle1$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

  /**
   * Path part for operation findById6
   */
  static readonly FindById6Path = '/commandes-client/{idCommandeClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById6$Response(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.FindById6Path, 'get');
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
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById6(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.findById6$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

  /**
   * Path part for operation delete6
   */
  static readonly Delete6Path = '/commandes-client/{idCommandeClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete6()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete6$Response(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.Delete6Path, 'delete');
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
   * To access the full response (for headers, for example), `delete6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete6(params: {
    idCommandeClient: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.delete6$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation countSalesPerMonth
   */
  static readonly CountSalesPerMonthPath = '/commandes-client/sales-per-month/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `countSalesPerMonth()` instead.
   *
   * This method doesn't expect any request body.
   */
  countSalesPerMonth$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Array<{
}>>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.CountSalesPerMonthPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Array<{
        }>>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `countSalesPerMonth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  countSalesPerMonth(params: {
    id: number;
  },
  context?: HttpContext

): Observable<Array<Array<{
}>>> {

    return this.countSalesPerMonth$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Array<{
}>>>) => r.body as Array<Array<{
}>>)
    );
  }

  /**
   * Path part for operation find3ByOrderByCreationDateDesc
   */
  static readonly Find3ByOrderByCreationDateDescPath = '/commandes-client/new-commandes-clt';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find3ByOrderByCreationDateDesc()` instead.
   *
   * This method doesn't expect any request body.
   */
  find3ByOrderByCreationDateDesc$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CommandeClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.Find3ByOrderByCreationDateDescPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommandeClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `find3ByOrderByCreationDateDesc$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find3ByOrderByCreationDateDesc(params?: {
  },
  context?: HttpContext

): Observable<Array<CommandeClientDto>> {

    return this.find3ByOrderByCreationDateDesc$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CommandeClientDto>>) => r.body as Array<CommandeClientDto>)
    );
  }

  /**
   * Path part for operation listeLigneCommandeClientByCommande
   */
  static readonly ListeLigneCommandeClientByCommandePath = '/commandes-client/lignescommande/{idCommande}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listeLigneCommandeClientByCommande()` instead.
   *
   * This method doesn't expect any request body.
   */
  listeLigneCommandeClientByCommande$Response(params: {
    idCommande: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<LigneCommandeClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.ListeLigneCommandeClientByCommandePath, 'get');
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
        return r as StrictHttpResponse<Array<LigneCommandeClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listeLigneCommandeClientByCommande$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listeLigneCommandeClientByCommande(params: {
    idCommande: number;
  },
  context?: HttpContext

): Observable<Array<LigneCommandeClientDto>> {

    return this.listeLigneCommandeClientByCommande$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<LigneCommandeClientDto>>) => r.body as Array<LigneCommandeClientDto>)
    );
  }

  /**
   * Path part for operation findLignesByCatgorieId
   */
  static readonly FindLignesByCatgorieIdPath = '/commandes-client/lignes-par-categorie/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLignesByCatgorieId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLignesByCatgorieId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<LigneCommandeClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.FindLignesByCatgorieIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LigneCommandeClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLignesByCatgorieId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLignesByCatgorieId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<Array<LigneCommandeClientDto>> {

    return this.findLignesByCatgorieId$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<LigneCommandeClientDto>>) => r.body as Array<LigneCommandeClientDto>)
    );
  }

  /**
   * Path part for operation getAllOrdersCount
   */
  static readonly GetAllOrdersCountPath = '/commandes-client/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOrdersCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrdersCount$Response(params: {
    idUtilisateur: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.GetAllOrdersCountPath, 'get');
    if (params) {
      rb.query('idUtilisateur', params.idUtilisateur, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOrdersCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrdersCount(params: {
    idUtilisateur: number;
  },
  context?: HttpContext

): Observable<number> {

    return this.getAllOrdersCount$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation findAllCommandeClientByUtilisateurId
   */
  static readonly FindAllCommandeClientByUtilisateurIdPath = '/commandes-client/commandes-by-user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCommandeClientByUtilisateurId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCommandeClientByUtilisateurId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CommandeClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.FindAllCommandeClientByUtilisateurIdPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommandeClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCommandeClientByUtilisateurId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCommandeClientByUtilisateurId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<Array<CommandeClientDto>> {

    return this.findAllCommandeClientByUtilisateurId$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CommandeClientDto>>) => r.body as Array<CommandeClientDto>)
    );
  }

  /**
   * Path part for operation findByReference1
   */
  static readonly FindByReference1Path = '/commandes-client/commande/{referenceCommandeClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByReference1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByReference1$Response(params: {
    referenceCommandeClient: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.FindByReference1Path, 'get');
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
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByReference1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByReference1(params: {
    referenceCommandeClient: string;
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.findByReference1$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

  /**
   * Path part for operation findAll6
   */
  static readonly FindAll6Path = '/commandes-client/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll6()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll6$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CommandeClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.FindAll6Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CommandeClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll6(params?: {
  },
  context?: HttpContext

): Observable<Array<CommandeClientDto>> {

    return this.findAll6$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CommandeClientDto>>) => r.body as Array<CommandeClientDto>)
    );
  }

  /**
   * Path part for operation findAllLignesCommande
   */
  static readonly FindAllLignesCommandePath = '/commandes-client/all/lignes-commandes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLignesCommande()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLignesCommande$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<LigneCommandeClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.FindAllLignesCommandePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LigneCommandeClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLignesCommande$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLignesCommande(params?: {
  },
  context?: HttpContext

): Observable<Array<LigneCommandeClientDto>> {

    return this.findAllLignesCommande$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<LigneCommandeClientDto>>) => r.body as Array<LigneCommandeClientDto>)
    );
  }

  /**
   * Path part for operation deleteArticle1
   */
  static readonly DeleteArticle1Path = '/commandes-client/deletearticle/{idCommande}/{idLigneCommande}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle1$Response(params: {
    '{idCommande}': number;
    '{idLigneCommande}': number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CommandeClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommandeClientService.DeleteArticle1Path, 'delete');
    if (params) {
      rb.path('{idCommande}', params['{idCommande}'], {});
      rb.path('{idLigneCommande}', params['{idLigneCommande}'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CommandeClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticle1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle1(params: {
    '{idCommande}': number;
    '{idLigneCommande}': number;
  },
  context?: HttpContext

): Observable<CommandeClientDto> {

    return this.deleteArticle1$Response(params,context).pipe(
      map((r: StrictHttpResponse<CommandeClientDto>) => r.body as CommandeClientDto)
    );
  }

}
