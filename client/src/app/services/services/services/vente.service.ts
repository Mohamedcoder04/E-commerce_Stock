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

import { VenteDto } from '../models/vente-dto';

@Injectable({
  providedIn: 'root',
})
export class VenteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save
   */
  static readonly SavePath = '/ventes/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: {
    body: VenteDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VenteDto>> {

    const rb = new RequestBuilder(this.rootUrl, VenteService.SavePath, 'post');
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
        return r as StrictHttpResponse<VenteDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: {
    body: VenteDto
  },
  context?: HttpContext

): Observable<VenteDto> {

    return this.save$Response(params,context).pipe(
      map((r: StrictHttpResponse<VenteDto>) => r.body as VenteDto)
    );
  }

  /**
   * Path part for operation findById
   */
  static readonly FindByIdPath = '/ventes/utilisateur/{idVente}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: {
    idVente: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VenteDto>> {

    const rb = new RequestBuilder(this.rootUrl, VenteService.FindByIdPath, 'get');
    if (params) {
      rb.path('idVente', params.idVente, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VenteDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: {
    idVente: number;
  },
  context?: HttpContext

): Observable<VenteDto> {

    return this.findById$Response(params,context).pipe(
      map((r: StrictHttpResponse<VenteDto>) => r.body as VenteDto)
    );
  }

  /**
   * Path part for operation findByCode
   */
  static readonly FindByCodePath = '/ventes/utilisateur/{code}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByCode()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByCode$Response(params: {
    code: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VenteDto>> {

    const rb = new RequestBuilder(this.rootUrl, VenteService.FindByCodePath, 'get');
    if (params) {
      rb.query('code', params.code, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VenteDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByCode$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByCode(params: {
    code: string;
  },
  context?: HttpContext

): Observable<VenteDto> {

    return this.findByCode$Response(params,context).pipe(
      map((r: StrictHttpResponse<VenteDto>) => r.body as VenteDto)
    );
  }

  /**
   * Path part for operation findAll
   */
  static readonly FindAllPath = '/ventes/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<VenteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, VenteService.FindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<VenteDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: {
  },
  context?: HttpContext

): Observable<Array<VenteDto>> {

    return this.findAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<VenteDto>>) => r.body as Array<VenteDto>)
    );
  }

  /**
   * Path part for operation delete
   */
  static readonly DeletePath = '/ventes/delete/{idVente}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: {
    idVente: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, VenteService.DeletePath, 'delete');
    if (params) {
      rb.path('idVente', params.idVente, {});
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
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: {
    idVente: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
