import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {
  private currentUser: string = '';

  setCurrentUser(username: string): void {
    this.currentUser = username;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }
}
