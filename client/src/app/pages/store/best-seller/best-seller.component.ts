import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../services/services/services/product.service";
import {ProductDto} from "../../../services/services/models/product-dto";
import {Router} from "@angular/router";
import {CartDto} from "../../../services/services/models/cart-dto";
import {CartService} from "../../../services/services/services/cart.service";
import {HelperService} from "../../../services/helper/helper.service";
import {UtilisateurDto} from "../../../services/services/models/utilisateur-dto";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import {GenerateNextService} from "../../../services/services/next/generate-next.service";
import {AuthService} from "../../../services/services/authService/auth.service";

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent implements OnInit {
  products : ProductDto[] = [];
  page : number = 1;
  count : number = 0;
  tableSize : number = 6;
  cartObj : CartDto = {};
  utilisateur : UtilisateurDto = {};
  minPrice: string = '';
  maxPrice: string = '';
  showButton: boolean= false;
  isAscending: boolean = true;
  constructor(
    private productService : ProductService,
    private router : Router,
    private cartService : CartService,
    private helperService : HelperService,
    private userService : UtilisateurService,
    private authService : AuthService,
    private generateNextService : GenerateNextService
  ) { }

  ngOnInit(): void {

    this.authService.getUserId().subscribe({
      next : (data)=>{
        this.userService.findById1({ idUtilisateur : data }).subscribe({
          next : (user)=>{ this.utilisateur = user; }
        })
      }
    })

    this.findTopProducts();
  }

  onTableDataChange(event : any){
    this.page = event;
    this.findTopProducts();
  }

  findTopProducts(){
    this.productService.getMostSelling().subscribe({
      next : (data)=>{
        this.products = data;
        console.log(this.products);
    }
    });
  }

  toProduct(id: number | undefined) {
    this.router.navigate(['store', 'produit',id]);
  }

  addItemToCart(product: ProductDto) {
    const token = localStorage.getItem('token');
    if(token){
      this.cartObj.product = product;
      this.cartObj.quantity = 1;
      this.cartObj.utilisateurDto = this.utilisateur;
      this.cartService.addToCarte({
        body : this.cartObj}
      ).subscribe({
        next : (data)=>{
          //alert("Product Added To Cart");
          this.generateNextService.cartAddedSubject.next(true);
        },
        error : (err)=>{
          console.log(err);
        }
      })
    }else{
      this.router.navigate(['store','login']);
    }
  }

  getButtonClass() {
    return this.isAscending ? 'asc' : 'desc'
  }
  sortProductsByPrice() {
    if (this.isAscending) {
      // @ts-ignore
      this.products.sort((a, b) => a.prixUnitaireHt - b.prixUnitaireHt); // Tri ascendant par prix
    } else {
      // @ts-ignore
      this.products.sort((a, b) => b.prixUnitaireHt - a.prixUnitaireTtc); // Tri descendant par prix
    }
  }

  togglePriceSort() {
    this.isAscending = !this.isAscending;
    this.sortProductsByPrice();
  }

  remove() {
    this.minPrice = '';
    this.maxPrice = '';
    this.findTopProducts();
  }

  async searchProduct() {
    await this.productService.getProductByPrix({
      min : +this.minPrice,
      max : +this.maxPrice
    }).subscribe({
      next : (result)=>{
        this.products = result;
      }
    })
  }

  onInputChange() {
    this.showButton = true;
  }


}
