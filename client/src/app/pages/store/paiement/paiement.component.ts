import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  days: Array<number> = [];
  months: Array<number> = [];

  constructor() { }

  ngOnInit(): void {
    this.days = [...Array(12).keys()].map(i => i + 1);
    this.months = [...Array(20).keys()].map(i => i + 2023);
  }

  pay() {
    localStorage.removeItem('client');
  }
}
