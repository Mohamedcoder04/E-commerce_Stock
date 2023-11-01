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

import { ChangePasswordUtilisatuerDto } from '../models/change-password-utilisatuer-dto';
import { UtilisateurDto } from '../models/utilisateur-dto';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save1
   */
  static readonly Save1Path = '/utilisateurs/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save1$Response(params: {
    body: UtilisateurDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UtilisateurDto>> {

    const rb = new RequestBuilder(this.rootUrl, UtilisateurService.Save1Path, 'post');
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
        return r as StrictHttpResponse<UtilisateurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save1(params: {
    body: UtilisateurDto
  },
  context?: HttpContext

): Observable<UtilisateurDto> {

    return this.save1$Response(params,context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>) => r.body as UtilisateurDto)
    );
  }

  /**
   * Path part for operation updatePassword
   */
  static readonly UpdatePasswordPath = '/utilisateurs/changemotdepasse/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword$Response(params: {
    id: number;
    body: ChangePasswordUtilisatuerDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UtilisateurDto>> {

    const rb = new RequestBuilder(this.rootUrl, UtilisateurService.UpdatePasswordPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UtilisateurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword(params: {
    id: number;
    body: ChangePasswordUtilisatuerDto
  },
  context?: HttpContext

): Observable<UtilisateurDto> {

    return this.updatePassword$Response(params,context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>) => r.body as UtilisateurDto)
    );
  }

  /**
   * Path part for operation findById1
   */
  static readonly FindById1Path = '/utilisateurs/utilisateur/{idUtilisateur}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1$Response(params: {
    idUtilisateur: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UtilisateurDto>> {

    const rb = new RequestBuilder(this.rootUrl, UtilisateurService.FindById1Path, 'get');
    if (params) {
      rb.path('idUtilisateur', params.idUtilisateur, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UtilisateurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1(params: {
    idUtilisateur: number;
  },
  context?: HttpContext

): Observable<UtilisateurDto> {

    return this.findById1$Response(params,context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>) => r.body as UtilisateurDto)
    );
  }

  /**
   * Path part for operation getNumberUtilisateursByCommandeClients
   */
  static readonly GetNumberUtilisateursByCommandeClientsPath = '/utilisateurs/count-users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNumberUtilisateursByCommandeClients()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberUtilisateursByCommandeClients$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, UtilisateurService.GetNumberUtilisateursByCommandeClientsPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `getNumberUtilisateursByCommandeClients$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNumberUtilisateursByCommandeClients(params?: {
  },
  context?: HttpContext

): Observable<number> {

    return this.getNumberUtilisateursByCommandeClients$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation findAll1
   */
  static readonly FindAll1Path = '/utilisateurs/all/{role}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1$Response(params: {
    role: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UtilisateurDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UtilisateurService.FindAll1Path, 'get');
    if (params) {
      rb.path('role', params.role, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UtilisateurDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1(params: {
    role: string;
  },
  context?: HttpContext

): Observable<Array<UtilisateurDto>> {

    return this.findAll1$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UtilisateurDto>>) => r.body as Array<UtilisateurDto>)
    );
  }

  /**
   * Path part for operation delete1
   */
  static readonly Delete1Path = '/utilisateurs/delete/{idUtilisateur}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete1()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UtilisateurService.Delete1Path, 'delete');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1(params: {
    id: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete1$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
