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

import { FournisseurDto } from '../models/fournisseur-dto';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save5
   */
  static readonly Save5Path = '/fournisseurs/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save5$Response(params: {
    body: FournisseurDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, FournisseurService.Save5Path, 'post');
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
        return r as StrictHttpResponse<FournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save5(params: {
    body: FournisseurDto
  },
  context?: HttpContext

): Observable<FournisseurDto> {

    return this.save5$Response(params,context).pipe(
      map((r: StrictHttpResponse<FournisseurDto>) => r.body as FournisseurDto)
    );
  }

  /**
   * Path part for operation findById4
   */
  static readonly FindById4Path = '/fournisseurs/{idFournisseur}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById4$Response(params: {
    idFournisseur: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FournisseurDto>> {

    const rb = new RequestBuilder(this.rootUrl, FournisseurService.FindById4Path, 'get');
    if (params) {
      rb.path('idFournisseur', params.idFournisseur, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FournisseurDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById4(params: {
    idFournisseur: number;
  },
  context?: HttpContext

): Observable<FournisseurDto> {

    return this.findById4$Response(params,context).pipe(
      map((r: StrictHttpResponse<FournisseurDto>) => r.body as FournisseurDto)
    );
  }

  /**
   * Path part for operation delete4
   */
  static readonly Delete4Path = '/fournisseurs/{idFournisseur}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete4()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete4$Response(params: {
    idFournisseur: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FournisseurService.Delete4Path, 'delete');
    if (params) {
      rb.path('idFournisseur', params.idFournisseur, {});
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
   * To access the full response (for headers, for example), `delete4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete4(params: {
    idFournisseur: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete4$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAll4
   */
  static readonly FindAll4Path = '/fournisseurs/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll4$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FournisseurDto>>> {

    const rb = new RequestBuilder(this.rootUrl, FournisseurService.FindAll4Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FournisseurDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll4(params?: {
  },
  context?: HttpContext

): Observable<Array<FournisseurDto>> {

    return this.findAll4$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FournisseurDto>>) => r.body as Array<FournisseurDto>)
    );
  }

}
