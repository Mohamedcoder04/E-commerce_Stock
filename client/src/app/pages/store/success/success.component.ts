import { Component, OnInit } from '@angular/core';
import {HelperService} from "../../../services/helper/helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  idUser : number = -1;
  constructor(
    private helperService : HelperService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.idUser = this.helperService.userId;
  }

  toProducts() {
    this.router.navigate(['store', 'orders', this.idUser]);
  }
}
