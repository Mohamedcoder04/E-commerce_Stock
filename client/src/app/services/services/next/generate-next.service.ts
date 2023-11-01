import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenerateNextService {
  public cartAddedSubject = new Subject<boolean>();
  public notificationSubject = new Subject<boolean>();
  constructor() { }
}
