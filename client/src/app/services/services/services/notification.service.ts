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

import { NotificationDto } from '../models/notification-dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save4
   */
  static readonly Save4Path = '/notification/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save4$Response(params: {
    body: NotificationDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<NotificationDto>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationService.Save4Path, 'post');
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
        return r as StrictHttpResponse<NotificationDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save4(params: {
    body: NotificationDto
  },
  context?: HttpContext

): Observable<NotificationDto> {

    return this.save4$Response(params,context).pipe(
      map((r: StrictHttpResponse<NotificationDto>) => r.body as NotificationDto)
    );
  }

  /**
   * Path part for operation findById3
   */
  static readonly FindById3Path = '/notification/notification/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById3$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<NotificationDto>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationService.FindById3Path, 'get');
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
        return r as StrictHttpResponse<NotificationDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById3(params: {
    id: number;
  },
  context?: HttpContext

): Observable<NotificationDto> {

    return this.findById3$Response(params,context).pipe(
      map((r: StrictHttpResponse<NotificationDto>) => r.body as NotificationDto)
    );
  }

  /**
   * Path part for operation findAll3
   */
  static readonly FindAll3Path = '/notification/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<NotificationDto>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationService.FindAll3Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<NotificationDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll3(params?: {
  },
  context?: HttpContext

): Observable<Array<NotificationDto>> {

    return this.findAll3$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<NotificationDto>>) => r.body as Array<NotificationDto>)
    );
  }

  /**
   * Path part for operation delete3
   */
  static readonly Delete3Path = '/notification/delete-notification/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete3()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete3$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationService.Delete3Path, 'delete');
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
   * To access the full response (for headers, for example), `delete3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete3(params: {
    id: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete3$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
