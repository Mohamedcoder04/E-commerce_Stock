import {Injectable, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private jwtHelper = new JwtHelperService();
  private decodedJwt : any;
  constructor() {
    this.decodedJwt = this.jwtHelper.decodeToken(localStorage.getItem('token') as string);
  }


  get userId() : number{
    return  this.decodedJwt.userId;
  }

  get userName() : string{
    return this.decodedJwt.fullName
  }

  get authority() : string{
    return this.decodedJwt.authorities[0].authority;
  }


}
