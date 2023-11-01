import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../services/authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(
    private router : Router,
    private authService : AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token : string = localStorage.getItem('token') as string;
    if(token){
      const jwtHelper = new JwtHelperService();
      const decodedJwt = jwtHelper.decodeToken(token);
      if(decodedJwt.authorities[0].authority !== 'ROLE_ADMIN'){
        this.authService.setLogged(false);
        localStorage.clear();
        this.router.navigate(['store']);
        return false;
      }
      return true;
    }
    this.router.navigate(['store']);
    return false;
  }
}
