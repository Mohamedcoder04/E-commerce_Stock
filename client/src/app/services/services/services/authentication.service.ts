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

import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { UtilisateurDto } from '../models/utilisateur-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation register
   */
  static readonly RegisterPath = '/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: {
    body: UtilisateurDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AuthenticationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.RegisterPath, 'post');
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
        return r as StrictHttpResponse<AuthenticationResponse>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: {
    body: UtilisateurDto
  },
  context?: HttpContext

): Observable<AuthenticationResponse> {

    return this.register$Response(params,context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
    );
  }

  /**
   * Path part for operation authenticate
   */
  static readonly AuthenticatePath = '/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: {
    body: AuthenticationRequest
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AuthenticationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticatePath, 'post');
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
        return r as StrictHttpResponse<AuthenticationResponse>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: {
    body: AuthenticationRequest
  },
  context?: HttpContext

): Observable<AuthenticationResponse> {

    return this.authenticate$Response(params,context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>) => r.body as AuthenticationResponse)
    );
  }

}
