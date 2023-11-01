import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSource = new BehaviorSubject<string>('');
  newSearch = this.searchSource.asObservable();

  constructor() { }

  updateSearch(keyword: string) {
    this.searchSource.next(keyword);
  }
}
