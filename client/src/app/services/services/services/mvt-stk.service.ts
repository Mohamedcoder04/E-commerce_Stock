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

import { MvtStkDto } from '../models/mvt-stk-dto';

@Injectable({
  providedIn: 'root',
})
export class MvtStkService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation sortieStock
   */
  static readonly SortieStockPath = '/mvtstk/sortieStock';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sortieStock()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sortieStock$Response(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MvtStkDto>> {

    const rb = new RequestBuilder(this.rootUrl, MvtStkService.SortieStockPath, 'post');
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
        return r as StrictHttpResponse<MvtStkDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sortieStock$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sortieStock(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<MvtStkDto> {

    return this.sortieStock$Response(params,context).pipe(
      map((r: StrictHttpResponse<MvtStkDto>) => r.body as MvtStkDto)
    );
  }

  /**
   * Path part for operation entreeStock
   */
  static readonly EntreeStockPath = '/mvtstk/entreeStock';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `entreeStock()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  entreeStock$Response(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MvtStkDto>> {

    const rb = new RequestBuilder(this.rootUrl, MvtStkService.EntreeStockPath, 'post');
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
        return r as StrictHttpResponse<MvtStkDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `entreeStock$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  entreeStock(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<MvtStkDto> {

    return this.entreeStock$Response(params,context).pipe(
      map((r: StrictHttpResponse<MvtStkDto>) => r.body as MvtStkDto)
    );
  }

  /**
   * Path part for operation correctionStockPositif
   */
  static readonly CorrectionStockPositifPath = '/mvtstk/correctionStockPositif';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `correctionStockPositif()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  correctionStockPositif$Response(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MvtStkDto>> {

    const rb = new RequestBuilder(this.rootUrl, MvtStkService.CorrectionStockPositifPath, 'post');
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
        return r as StrictHttpResponse<MvtStkDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `correctionStockPositif$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  correctionStockPositif(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<MvtStkDto> {

    return this.correctionStockPositif$Response(params,context).pipe(
      map((r: StrictHttpResponse<MvtStkDto>) => r.body as MvtStkDto)
    );
  }

  /**
   * Path part for operation correctionStockNegatif
   */
  static readonly CorrectionStockNegatifPath = '/mvtstk/correctionStockNegatif';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `correctionStockNegatif()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  correctionStockNegatif$Response(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MvtStkDto>> {

    const rb = new RequestBuilder(this.rootUrl, MvtStkService.CorrectionStockNegatifPath, 'post');
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
        return r as StrictHttpResponse<MvtStkDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `correctionStockNegatif$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  correctionStockNegatif(params: {
    body: MvtStkDto
  },
  context?: HttpContext

): Observable<MvtStkDto> {

    return this.correctionStockNegatif$Response(params,context).pipe(
      map((r: StrictHttpResponse<MvtStkDto>) => r.body as MvtStkDto)
    );
  }

  /**
   * Path part for operation stockArticle
   */
  static readonly StockArticlePath = '/mvtstk/stockArticle/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stockArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  stockArticle$Response(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, MvtStkService.StockArticlePath, 'get');
    if (params) {
      rb.path('idArticle', params.idArticle, {});
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
   * To access the full response (for headers, for example), `stockArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  stockArticle(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<number> {

    return this.stockArticle$Response(params,context).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation listeMvtStkArticle
   */
  static readonly ListeMvtStkArticlePath = '/mvtstk/listeMvtStck/article/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listeMvtStkArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  listeMvtStkArticle$Response(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<MvtStkDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MvtStkService.ListeMvtStkArticlePath, 'get');
    if (params) {
      rb.path('idArticle', params.idArticle, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MvtStkDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listeMvtStkArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listeMvtStkArticle(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<Array<MvtStkDto>> {

    return this.listeMvtStkArticle$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<MvtStkDto>>) => r.body as Array<MvtStkDto>)
    );
  }

}
