import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenGuardService implements CanActivate{

  constructor(
    private router : Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    if(!token && jwtHelper.isTokenExpired(token)){
      localStorage.clear();
      this.router.navigate(['store','login']);
      return false;
    }
    return true;
  }


}
