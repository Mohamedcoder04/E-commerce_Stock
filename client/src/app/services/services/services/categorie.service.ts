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

import { CategoryDto } from '../models/category-dto';

@Injectable({
  providedIn: 'root',
})
export class CategorieService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save9
   */
  static readonly Save9Path = '/categories/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save9$Response(params: {
    body: CategoryDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, CategorieService.Save9Path, 'post');
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
        return r as StrictHttpResponse<CategoryDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save9(params: {
    body: CategoryDto
  },
  context?: HttpContext

): Observable<CategoryDto> {

    return this.save9$Response(params,context).pipe(
      map((r: StrictHttpResponse<CategoryDto>) => r.body as CategoryDto)
    );
  }

  /**
   * Path part for operation getCategorieById
   */
  static readonly GetCategorieByIdPath = '/categories/{idCategory}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategorieById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategorieById$Response(params: {
    idCategory: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, CategorieService.GetCategorieByIdPath, 'get');
    if (params) {
      rb.path('idCategory', params.idCategory, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCategorieById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategorieById(params: {
    idCategory: number;
  },
  context?: HttpContext

): Observable<CategoryDto> {

    return this.getCategorieById$Response(params,context).pipe(
      map((r: StrictHttpResponse<CategoryDto>) => r.body as CategoryDto)
    );
  }

  /**
   * Path part for operation findByCodeCategorie
   */
  static readonly FindByCodeCategoriePath = '/categories/category/{codeCategory}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByCodeCategorie()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByCodeCategorie$Response(params: {
    codeCategory: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, CategorieService.FindByCodeCategoriePath, 'get');
    if (params) {
      rb.path('codeCategory', params.codeCategory, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByCodeCategorie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByCodeCategorie(params: {
    codeCategory: string;
  },
  context?: HttpContext

): Observable<CategoryDto> {

    return this.findByCodeCategorie$Response(params,context).pipe(
      map((r: StrictHttpResponse<CategoryDto>) => r.body as CategoryDto)
    );
  }

  /**
   * Path part for operation findAllForHome1
   */
  static readonly FindAllForHome1Path = '/categories/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllForHome1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllForHome1$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CategorieService.FindAllForHome1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllForHome1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllForHome1(params?: {
  },
  context?: HttpContext

): Observable<Array<CategoryDto>> {

    return this.findAllForHome1$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>) => r.body as Array<CategoryDto>)
    );
  }

  /**
   * Path part for operation findAll8
   */
  static readonly FindAll8Path = '/categories/adimn/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll8()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll8$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CategorieService.FindAll8Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll8(params?: {
  },
  context?: HttpContext

): Observable<Array<CategoryDto>> {

    return this.findAll8$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>) => r.body as Array<CategoryDto>)
    );
  }

  /**
   * Path part for operation delete8
   */
  static readonly Delete8Path = '/categories/categories/delete/{idCategory}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete8()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete8$Response(params: {
    idCategory: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CategorieService.Delete8Path, 'delete');
    if (params) {
      rb.path('idCategory', params.idCategory, {});
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
   * To access the full response (for headers, for example), `delete8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete8(params: {
    idCategory: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete8$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
