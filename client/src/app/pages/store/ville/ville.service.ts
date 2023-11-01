import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private apiUrl = 'http://api.geonames.org/searchJSON';
  private username = 'your_username'; // Remplacez par votre nom d'utilisateur GeoNames

  constructor() { }

  getAllVilles(countryCode: string): Observable<any> {
    const params = {
      country: countryCode,
      maxRows: '1000',
      username: this.username
    };

    return new Observable<any>((observer) => {
      axios.get(this.apiUrl, { params })
        .then(response => {
          observer.next(response.data.geonames);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
