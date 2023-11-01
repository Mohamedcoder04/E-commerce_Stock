import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor() { }

  getAllPays(): Observable<any> {
    return new Observable<any>((observer) => {
      axios.get(this.apiUrl)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
