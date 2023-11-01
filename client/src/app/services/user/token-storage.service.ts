import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token : string) : void{
    window.localStorage.removeItem('token');
    window.localStorage.setItem('token', token);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public saveUser(user : any) : void{
    window.localStorage.removeItem('user');
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() : any{
    return JSON.parse(localStorage.getItem('user') as string);
  }

}
