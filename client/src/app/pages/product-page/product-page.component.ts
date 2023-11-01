import {Component, OnInit} from '@angular/core';
import {ProductDto} from "../../services/services/models/product-dto";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {ProductService} from "../../services/services/services/product.service";
import {Subscription} from "rxjs";
import {LocationStrategy} from "@angular/common";
import {CartDto} from "../../services/services/models/cart-dto";
import {UtilisateurDto} from "../../services/services/models/utilisateur-dto";
import {HelperService} from "../../services/helper/helper.service";
import {UtilisateurService} from "../../services/services/services/utilisateur.service";
import {CartService} from "../../services/services/services/cart.service";
import {GenerateNextService} from "../../services/services/next/generate-next.service";
import {MvtStkService} from "../../services/services/services/mvt-stk.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  cartObj: CartDto = {
    quantity : 1
  };
  productDto: ProductDto = {};
  userDto: UtilisateurDto = {};
  innerLoading = true;
  variant: number = 0;
  activeTab = 0;
  fetchError = false;
  stock: number = 0;
  quantity = 1;
  prix: number | undefined = 0;
  qteStock: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private helperService: HelperService,
              private userService: UtilisateurService,
              private cartService: CartService,
              private generateNextService: GenerateNextService,
              private mvtstkService : MvtStkService
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.productService.findById2({
      idArticle: id
    }).subscribe({
      next: (product) => {
        this.productDto = product;
        this.innerLoading = false;
        this.prix = product.prixUnitaireHt;
      }
    });
    if(localStorage.getItem('token')){
      this.userService.findById1({
        idUtilisateur: this.helperService.userId
      }).subscribe({
        next: (user) => {
          this.userDto = user;
        }
      });
    }


    this.mvtstkService.stockArticle({ idArticle : id }).subscribe({
      next : (data)=>{
        if(isNaN(data)){
          this.stock = 0;

        }else{
          this.stock = data;
        }
      }
    });
  }

  setActiveTab(tab: number) {
    this.activeTab = tab;
  }

  addToCart(amountElement: ProductDto) {
    console.log(this.quantity);
    const token = localStorage.getItem('token');
    if (token) {
      this.cartObj.product = this.productDto;
      this.cartObj.utilisateurDto = this.userDto;
      this.cartService.addToCarte({
          body: this.cartObj
        }
      ).subscribe({
        next: (data) => {
          this.generateNextService.cartAddedSubject.next(true);
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.router.navigate(['store', 'login']);
    }
  }

  buyNow(id: number | undefined) {
    const navigationExtras: NavigationExtras = {
      state: {quantity : this.cartObj.quantity}
    };
    this.router.navigate(['store', 'info-client' , id , this.cartObj.quantity])
  }

  changePrix() {
    this.prix = this.productDto.prixUnitaireHt && this.cartObj.quantity != null ? this.productDto.prixUnitaireHt * this.cartObj.quantity : 0;
  }
}
