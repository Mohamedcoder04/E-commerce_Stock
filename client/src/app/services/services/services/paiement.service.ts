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

import { PaiementDto } from '../models/paiement-dto';

@Injectable({
  providedIn: 'root',
})
export class PaiementService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save3
   */
  static readonly Save3Path = '/paiements/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save3$Response(params: {
    body: PaiementDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PaiementDto>> {

    const rb = new RequestBuilder(this.rootUrl, PaiementService.Save3Path, 'post');
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
        return r as StrictHttpResponse<PaiementDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save3(params: {
    body: PaiementDto
  },
  context?: HttpContext

): Observable<PaiementDto> {

    return this.save3$Response(params,context).pipe(
      map((r: StrictHttpResponse<PaiementDto>) => r.body as PaiementDto)
    );
  }

  /**
   * Path part for operation findSumAllPaiements
   */
  static readonly FindSumAllPaiementsPath = '/paiements/total';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findSumAllPaiements()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSumAllPaiements$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, PaiementService.FindSumAllPaiementsPath, 'get');
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
   * To access the full response (for headers, for example), `findSumAllPaiements$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSumAllPaiements(params?: {
  },
  context?: HttpContext

): Observable<number> {

    return this.findSumAllPaiements$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
