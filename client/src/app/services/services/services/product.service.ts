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

import { LigneCommandeClientDto } from '../models/ligne-commande-client-dto';
import { LigneCommandeFournisseurDto } from '../models/ligne-commande-fournisseur-dto';
import { LigneVenteDto } from '../models/ligne-vente-dto';
import { ProductDto } from '../models/product-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation save2
   */
  static readonly Save2Path = '/products/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2$Response(params: {
    body: ProductDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.Save2Path, 'post');
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
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `save2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2(params: {
    body: ProductDto
  },
  context?: HttpContext

): Observable<ProductDto> {

    return this.save2$Response(params,context).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation addProducts
   */
  static readonly AddProductsPath = '/products/add-products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProducts()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProducts$Response(params: {
    body: Array<ProductDto>
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.AddProductsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `addProducts$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProducts(params: {
    body: Array<ProductDto>
  },
  context?: HttpContext

): Observable<void> {

    return this.addProducts$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findById2
   */
  static readonly FindById2Path = '/products/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById2$Response(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindById2Path, 'get');
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
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById2(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<ProductDto> {

    return this.findById2$Response(params,context).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation searchProducts
   */
  static readonly SearchProductsPath = '/products/search/{keyword}/{page}/{size}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProducts$Response(params: {
    keyword: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.SearchProductsPath, 'get');
    if (params) {
      rb.query('keyword', params.keyword, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProducts(params: {
    keyword: string;
  },
  context?: HttpContext

): Observable<Array<ProductDto>> {

    return this.searchProducts$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation getInterested
   */
  static readonly GetInterestedPath = '/products/products/interested';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInterested()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInterested$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.GetInterestedPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getInterested$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInterested(params?: {
  },
  context?: HttpContext

): Observable<Array<ProductDto>> {

    return this.getInterested$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation getMostSelling
   */
  static readonly GetMostSellingPath = '/products/most-selling';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMostSelling()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMostSelling$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.GetMostSellingPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMostSelling$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMostSelling(params?: {
  },
  context?: HttpContext

): Observable<Array<ProductDto>> {

    return this.getMostSelling$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation findHistoriqueVentes
   */
  static readonly FindHistoriqueVentesPath = '/products/historique/ventes/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findHistoriqueVentes()` instead.
   *
   * This method doesn't expect any request body.
   */
  findHistoriqueVentes$Response(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<LigneVenteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindHistoriqueVentesPath, 'get');
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
        return r as StrictHttpResponse<Array<LigneVenteDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findHistoriqueVentes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findHistoriqueVentes(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<Array<LigneVenteDto>> {

    return this.findHistoriqueVentes$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<LigneVenteDto>>) => r.body as Array<LigneVenteDto>)
    );
  }

  /**
   * Path part for operation findHistoriqueCommandeClient
   */
  static readonly FindHistoriqueCommandeClientPath = '/products/historique/commandesclient/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findHistoriqueCommandeClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  findHistoriqueCommandeClient$Response(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<LigneCommandeClientDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindHistoriqueCommandeClientPath, 'get');
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
        return r as StrictHttpResponse<Array<LigneCommandeClientDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findHistoriqueCommandeClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findHistoriqueCommandeClient(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<Array<LigneCommandeClientDto>> {

    return this.findHistoriqueCommandeClient$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<LigneCommandeClientDto>>) => r.body as Array<LigneCommandeClientDto>)
    );
  }

  /**
   * Path part for operation findHistoriqueCommandeFournisseur
   */
  static readonly FindHistoriqueCommandeFournisseurPath = '/products/historique/commandefournisseur/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findHistoriqueCommandeFournisseur()` instead.
   *
   * This method doesn't expect any request body.
   */
  findHistoriqueCommandeFournisseur$Response(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<LigneCommandeFournisseurDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindHistoriqueCommandeFournisseurPath, 'get');
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
        return r as StrictHttpResponse<Array<LigneCommandeFournisseurDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findHistoriqueCommandeFournisseur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findHistoriqueCommandeFournisseur(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<Array<LigneCommandeFournisseurDto>> {

    return this.findHistoriqueCommandeFournisseur$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<LigneCommandeFournisseurDto>>) => r.body as Array<LigneCommandeFournisseurDto>)
    );
  }

  /**
   * Path part for operation findAllArticleByCategory
   */
  static readonly FindAllArticleByCategoryPath = '/products/filter/{idCategory}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllArticleByCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllArticleByCategory$Response(params: {
    idCategory: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindAllArticleByCategoryPath, 'get');
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
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllArticleByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllArticleByCategory(params: {
    idCategory: number;
  },
  context?: HttpContext

): Observable<Array<ProductDto>> {

    return this.findAllArticleByCategory$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation getProductByPrix
   */
  static readonly GetProductByPrixPath = '/products/by-price/{min}/{max}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductByPrix()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductByPrix$Response(params: {
    min: number;
    max: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.GetProductByPrixPath, 'get');
    if (params) {
      rb.path('min', params.min, {});
      rb.path('max', params.max, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductByPrix$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductByPrix(params: {
    min: number;
    max: number;
  },
  context?: HttpContext

): Observable<Array<ProductDto>> {

    return this.getProductByPrix$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation findByCodeArticle
   */
  static readonly FindByCodeArticlePath = '/products/by-code-article/{codeArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByCodeArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByCodeArticle$Response(params: {
    codeArticle: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ProductDto>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindByCodeArticlePath, 'get');
    if (params) {
      rb.path('codeArticle', params.codeArticle, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findByCodeArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByCodeArticle(params: {
    codeArticle: string;
  },
  context?: HttpContext

): Observable<ProductDto> {

    return this.findByCodeArticle$Response(params,context).pipe(
      map((r: StrictHttpResponse<ProductDto>) => r.body as ProductDto)
    );
  }

  /**
   * Path part for operation findAllForHome
   */
  static readonly FindAllForHomePath = '/products/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllForHome()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllForHome$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindAllForHomePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllForHome$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllForHome(params?: {
  },
  context?: HttpContext

): Observable<Array<ProductDto>> {

    return this.findAllForHome$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation findAll2
   */
  static readonly FindAll2Path = '/products/admin/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<ProductDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.FindAll2Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll2(params?: {
  },
  context?: HttpContext

): Observable<Array<ProductDto>> {

    return this.findAll2$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<ProductDto>>) => r.body as Array<ProductDto>)
    );
  }

  /**
   * Path part for operation delete2
   */
  static readonly Delete2Path = '/products/delete/{idArticle}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete2()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete2$Response(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ProductService.Delete2Path, 'delete');
    if (params) {
      rb.path('idArticle', params.idArticle, {});
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
   * To access the full response (for headers, for example), `delete2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete2(params: {
    idArticle: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.delete2$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
