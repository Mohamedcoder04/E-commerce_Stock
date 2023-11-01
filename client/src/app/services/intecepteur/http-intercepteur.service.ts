import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoaderService} from "../../component/loader/service/loader.service";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepteurService implements HttpInterceptor{

  constructor(
    private loaderService : LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    if (
      !req.url.includes('/authenticate') ||
      !req.url.includes('/register') ||
      !req.url.includes('/store')
    ) {
      const token = localStorage.getItem('token');
      if (token) {
        // assigner le token
        const authReq = req.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return this.handleRequest(authReq, next);
      }
    }
    return this.handleRequest(req, next);
  }

  handleRequest(req : HttpRequest<any>,  next: HttpHandler) : Observable<HttpEvent<any>>{
    return next.handle(req)
      .pipe(
        tap( (event : HttpEvent<any>)=>{
        if(event instanceof HttpResponse){
          this.loaderService.hide();
        }
    }, (err : any)=>{
        this.loaderService.hide();
    })
    );
  }

}
