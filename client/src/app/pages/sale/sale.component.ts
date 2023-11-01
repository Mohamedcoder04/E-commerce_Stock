import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/services/services/product.service";
import {CartService} from "../../services/services/services/cart.service";
import {HelperService} from "../../services/helper/helper.service";
import {CartDto} from "../../services/services/models/cart-dto";
import {ProductDto} from "../../services/services/models/product-dto";
import {GenerateNextService} from "../../services/services/next/generate-next.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  cartProducts: CartDto[] = [];
  subTotal: number = 0;
  product : ProductDto = {}
  item = 'items';
  quantity = 1;

  constructor(
    private cartService: CartService,
    private helperService : HelperService,
    private generateService : GenerateNextService,
    private router : Router
  ) {

  }
  ngOnInit(): void {


    this.loadCart();
    if(this.cartProducts.length <= 1){
      this.item = 'item'
    }
  }

  loadCart() {
    this.subTotal = 0;
    this.cartService.findAllCartByUtilisateurId({
      id : this.helperService.userId
    }).subscribe({
      next : (data)=>{
        this.cartProducts = data;
        console.log(data);
        this.generateService.cartAddedSubject.next(true);
        data.forEach(cart=>{
          if(cart.product){
            this.subTotal = cart.product.prixUnitaireHt != null && cart.quantity ? this.subTotal + cart.product.prixUnitaireHt * cart.quantity : this.subTotal;
          }
        })
      }
    })
  }



  removeItem(id: number| undefined) {
    this.cartService.delete9({
      idCart : id as number
    }).subscribe({
      next : ()=>{
        this.generateService.cartAddedSubject.next(true);
        this.loadCart();
      }
    })
  }


  goToItem(id: number | undefined) {
    this.router.navigate(['store','produit',id]);
  }

  activatePurchase() {
    this.cartProducts.forEach(c=>{
      this.cartService.save10({body : c}).subscribe({
        next : (data)=>{

        }
      });
    })
    this.router.navigate(['store' , 'info-client']);
  }


  changeTotal(cartItem: CartDto) {

    this.subTotal = 0;
    this.cartProducts.forEach(cartItem => {
      if(cartItem.product)
        this.subTotal = cartItem.product.prixUnitaireHt != null && cartItem.quantity ? this.subTotal + cartItem.product.prixUnitaireHt * cartItem.quantity : this.subTotal;

    });
  }

}
