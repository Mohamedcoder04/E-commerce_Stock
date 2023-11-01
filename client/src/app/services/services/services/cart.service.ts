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

import { CartDto } from '../models/cart-dto';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save10
   */
  static readonly Save10Path = '/cart/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save10()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save10$Response(params: {
    body: CartDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CartDto>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.Save10Path, 'post');
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
        return r as StrictHttpResponse<CartDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save10$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save10(params: {
    body: CartDto
  },
  context?: HttpContext

): Observable<CartDto> {

    return this.save10$Response(params,context).pipe(
      map((r: StrictHttpResponse<CartDto>) => r.body as CartDto)
    );
  }

  /**
   * Path part for operation addToCarte
   */
  static readonly AddToCartePath = '/cart/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToCarte()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToCarte$Response(params: {
    body: CartDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CartDto>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.AddToCartePath, 'post');
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
        return r as StrictHttpResponse<CartDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addToCarte$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToCarte(params: {
    body: CartDto
  },
  context?: HttpContext

): Observable<CartDto> {

    return this.addToCarte$Response(params,context).pipe(
      map((r: StrictHttpResponse<CartDto>) => r.body as CartDto)
    );
  }

  /**
   * Path part for operation findAllCartByUtilisateurId
   */
  static readonly FindAllCartByUtilisateurIdPath = '/cart/all-cart/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCartByUtilisateurId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCartByUtilisateurId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CartDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.FindAllCartByUtilisateurIdPath, 'get');
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
        return r as StrictHttpResponse<Array<CartDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCartByUtilisateurId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCartByUtilisateurId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<Array<CartDto>> {

    return this.findAllCartByUtilisateurId$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CartDto>>) => r.body as Array<CartDto>)
    );
  }

  /**
   * Path part for operation delete9
   */
  static readonly Delete9Path = '/cart/delete/{idCart}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete9()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9$Response(params: {
    idCart: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.Delete9Path, 'delete');
    if (params) {
      rb.path('idCart', params.idCart, {});
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
   * To access the full response (for headers, for example), `delete9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9(params: {
    idCart: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete9$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAll
   */
  static readonly DeleteAllPath = '/cart/delete-all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.DeleteAllPath, 'delete');
    if (params) {
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
   * To access the full response (for headers, for example), `deleteAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAll(params?: {
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
