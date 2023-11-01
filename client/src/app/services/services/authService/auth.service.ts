import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fullName$ = new BehaviorSubject<string>("");
  private logged$ = new BehaviorSubject<boolean>(false);
  private userId$ = new BehaviorSubject<number>(-1);
  private role$ = new BehaviorSubject<string>("");

  constructor() {
    // Restaurer les valeurs à partir du localStorage lors de la création du service
    this.restoreDataFromLocalStorage();
  }

  public getLogged() {
    return this.logged$.asObservable();
  }

  public setRole(log: string) {
    this.role$.next(log);
    // Sauvegarder la valeur dans le localStorage
    this.saveDataToLocalStorage();
  }

  public getRole() {
    return this.role$.asObservable();
  }

  public setLogged(log: boolean) {
    this.logged$.next(log);
    // Sauvegarder la valeur dans le localStorage
    this.saveDataToLocalStorage();
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname: string) {
    this.fullName$.next(fullname);
    // Sauvegarder la valeur dans le localStorage
    this.saveDataToLocalStorage();
  }

  public getUserId() {
    return this.userId$.asObservable();
  }

  public setUserId(id: number) {
    this.userId$.next(id);
    this.saveDataToLocalStorage();
  }

  private saveDataToLocalStorage() {
    // Sauvegarder les valeurs actuelles dans le localStorage
    localStorage.setItem('fullName', this.fullName$.value);
    localStorage.setItem('logged', this.logged$.value.toString());
    localStorage.setItem('userId', this.userId$.value.toString());
    localStorage.setItem('role', this.role$.value.toString());
  }

  private restoreDataFromLocalStorage() {
    // Restaurer les valeurs à partir du localStorage
    const storedFullName = localStorage.getItem('fullName');
    const storedLogged = localStorage.getItem('logged');
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');

    if (storedFullName) {
      this.fullName$.next(storedFullName);
    }

    if (storedLogged) {
      this.logged$.next(storedLogged === 'true');
    }

    if (storedRole) {
      this.role$.next(storedRole);
    }

    if (storedUserId) {
      this.userId$.next(+storedUserId); // Convertir la chaîne en nombre avec le + avant la variable
    }
  }
}
