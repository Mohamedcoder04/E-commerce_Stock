import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "./services/services/services/product.service";
import {CartService} from "./services/services/services/cart.service";
import {CartDto} from "./services/services/models/cart-dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
  }

}
