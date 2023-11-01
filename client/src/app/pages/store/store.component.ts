import {Component, OnInit} from '@angular/core';
import {CartDto} from "../../services/services/models/cart-dto";
import {ProductService} from "../../services/services/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../services/services/services/cart.service";
import {CategorieService} from "../../services/services/services/categorie.service";
import {CategoryDto} from "../../services/services/models/category-dto";
import {GenerateNextService} from "../../services/services/next/generate-next.service";
import {AuthService} from "../../services/services/authService/auth.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  title = 'ecommerce';
  cartProducts: CartDto[] = [];
  subTotal: number = 0;
  categories: CategoryDto[] = []
  isLogin = false;
  fullName: string | undefined = '';
  userId = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private categorieService: CategorieService,
    private activatedRoute: ActivatedRoute,
    //private helperService: HelperService,
    private generateService: GenerateNextService,
    private authService: AuthService
  ) {
    this.generateService.cartAddedSubject.subscribe({
      next: () => {
        this.loadCart();
      }
    });
  }

  ngOnInit() {
    this.authService.getFullNameFromStore().subscribe(val => {
      console.log(val);
      this.fullName = val;
    });

    this.authService.getUserId().subscribe(val => {
      console.log(val);
      this.userId = val;
    });
    this.authService.getLogged().subscribe(val => {
      console.log(val);
      this.isLogin = val;
    });
    if (this.isLogin) {
      this.loadCart();
    }
    this.findAllCategories();
  }


  loadCart() {
    this.subTotal = 0;
    this.cartService.findAllCartByUtilisateurId({
      id: this.userId
    }).subscribe({
      next: (data) => {
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
    this.userId = 0;
    this.cartProducts = [];
    this.subTotal = 0;
    localStorage.clear();
    //this.generateService.cartAddedSubject.next(true);
    this.router.navigate(['store', 'login']);
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

  toOrders(userId: number | undefined) {
    this.router.navigate(['store', 'orders', userId]);
  }

  searchProduct(search: HTMLInputElement) {
    if (search.value.trim().length) {
      const url = '/store/search/' + search.value;
      this.router.navigate([url]);
    }
  }

  activatePurchase() {
    this.router.navigate(['store', 'info-client']);
  }

  goToCart() {
    this.router.navigate(['store', 'sale']);
  }

  deleteAll() {
    this.cartService.deleteAll().subscribe({
      next: (data) => {
        this.loadCart();
      }
    });
  }

  toCategorie(id: number | undefined) {
    this.router.navigate(['store', 'categorie', id]);
  }
}
