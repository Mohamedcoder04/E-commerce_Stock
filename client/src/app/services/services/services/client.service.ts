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

import { ClientDto } from '../models/client-dto';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save8
   */
  static readonly Save8Path = '/clients/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save8$Response(params: {
    body: ClientDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClientService.Save8Path, 'post');
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
        return r as StrictHttpResponse<ClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save8(params: {
    body: ClientDto
  },
  context?: HttpContext

): Observable<ClientDto> {

    return this.save8$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClientDto>) => r.body as ClientDto)
    );
  }

  /**
   * Path part for operation findById7
   */
  static readonly FindById7Path = '/clients/client/{idClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById7()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById7$Response(params: {
    idClient: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClientService.FindById7Path, 'get');
    if (params) {
      rb.path('idClient', params.idClient, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById7(params: {
    idClient: number;
  },
  context?: HttpContext

): Observable<ClientDto> {

    return this.findById7$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClientDto>) => r.body as ClientDto)
    );
  }

  /**
   * Path part for operation findByEmail
   */
  static readonly FindByEmailPath = '/clients/client/by-email/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByEmail$Response(params: {
    email: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClientDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClientService.FindByEmailPath, 'get');
    if (params) {
      rb.path('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByEmail(params: {
    email: string;
  },
  context?: HttpContext

): Observable<ClientDto> {

    return this.findByEmail$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClientDto>) => r.body as ClientDto)
    );
  }

  /**
   * Path part for operation findAll7
   */
  static readonly FindAll7Path = '/clients/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll7()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll7$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ClientService.FindAll7Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll7(params?: {
  },
  context?: HttpContext

): Observable<Array<ClientDto>> {

    return this.findAll7$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ClientDto>>) => r.body as Array<ClientDto>)
    );
  }

  /**
   * Path part for operation delete7
   */
  static readonly Delete7Path = '/clients/delete/{idClient}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete7()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete7$Response(params: {
    idClient: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ClientService.Delete7Path, 'delete');
    if (params) {
      rb.path('idClient', params.idClient, {});
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
   * To access the full response (for headers, for example), `delete7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete7(params: {
    idClient: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete7$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
