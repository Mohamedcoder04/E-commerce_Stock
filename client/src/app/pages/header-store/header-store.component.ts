import {Component, Input, OnInit} from '@angular/core';
import {CartDto} from "../../services/services/models/cart-dto";
import {CategoryDto} from "../../services/services/models/category-dto";
import {ProductService} from "../../services/services/services/product.service";
import {CartService} from "../../services/services/services/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategorieService} from "../../services/services/services/categorie.service";
import {HelperService} from "../../services/helper/helper.service";
import {GenerateNextService} from "../../services/services/next/generate-next.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.scss']
})
export class HeaderStoreComponent implements OnInit {
  role = 'store';
  title = 'ecommerce';
  cartProducts: CartDto[] = [];
  subTotal: number = 0;
  categories: CategoryDto[] = []
  isLogin = false;
  fullName: string | undefined = '';
  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private categorieService: CategorieService,
    private activatedRoute: ActivatedRoute,
    private helperService: HelperService,
    private generateService: GenerateNextService
  ) {
    this.generateService.cartAddedSubject.subscribe({
      next : ()=>{
        this.loadCart();
      }
    });
  }

  ngOnInit(): void {
    this.fullName = this.helperService.userName;
    if(localStorage.getItem('token')){
      this.isLogin = true;
      this.loadCart();
    }
    this.findAllCategories();
    if(this.helperService.authority === 'ROLE_ADMIN'){
      this.role = 'admin'
    }
  }


  loadCart() {
    this.subTotal = 0;
    this.cartService.findAllCartByUtilisateurId({
      id: this.helperService.userId
    }).subscribe({
      next: (data) => {
        console.log(data);
        this.cartProducts = data;
        this.cartProducts.forEach(cart => {
          if (cart.product?.prixUnitaireHt)
            this.subTotal = this.subTotal + cart.product?.prixUnitaireHt;
        });
      }
    })
  }

  login() {
    this.router.navigate(['store', 'login']);
  }

  logout() {
    this.isLogin = false;
    this.cartProducts = [];
    this.subTotal = 0;
    //this.fullName = '';
    localStorage.removeItem('token');
    //this.generateService.cartAddedSubject.next(true);
    this.router.navigate(['store']);
  }

  toProfile() {
    this.router.navigate(['store', 'profil']);
  }

  private findAllCategories() {
    this.categorieService.findAllForHome1().subscribe({
      next: (data) => {
        this.categories = data
      }
    });
  }


}
