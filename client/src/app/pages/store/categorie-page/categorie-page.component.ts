import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductDto} from "../../../services/services/models/product-dto";
import {ProductService} from "../../../services/services/services/product.service";
import {CartDto} from "../../../services/services/models/cart-dto";
import {UtilisateurDto} from "../../../services/services/models/utilisateur-dto";
import {CartService} from "../../../services/services/services/cart.service";
import {GenerateNextService} from "../../../services/services/next/generate-next.service";
import {CategoryDto} from "../../../services/services/models/category-dto";
import {CategorieService} from "../../../services/services/services/categorie.service";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import {HelperService} from "../../../services/helper/helper.service";

@Component({
  selector: 'app-categorie-page',
  templateUrl: './categorie-page.component.html',
  styleUrls: ['./categorie-page.component.scss']
})
export class CategoriePageComponent implements OnInit {

  idCategory = -1;
  category : CategoryDto = {};
  products : ProductDto[] = [];
  page : number = 1;
  count : number = 0;
  tableSize : number = 6;
  cartObj : CartDto = {};
  utilisateur : UtilisateurDto = {};
  minPrice: any;
  maxPrice: any;
  showButton: boolean = false;
  isAscending: boolean = true;

  constructor(
    private activatedRoute : ActivatedRoute,
    private categoryService : CategorieService,
    private productService : ProductService,
    private cartService : CartService,
    private generateNextService : GenerateNextService,
    private router : Router,
    private userService : UtilisateurService,
    private helperService : HelperService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idCategory = +params['id']; // Utilisez le signe "+" pour convertir l'ID de chaîne en nombre
      if (this.idCategory > -1) {
        this.fetchProductsByCategory()
        this.onTableDataChange(event);
        this.categoryService.getCategorieById({idCategory : this.idCategory}).subscribe({
          next : (category)=>{ this.category = category }
        });

        this.userService.findById1({ idUtilisateur : this.helperService.userId }).subscribe({
          next:(user)=>{ this.utilisateur = user; }
        })
      }
    });
  }


  onTableDataChange(event : any){
    this.page = event;
    this.fetchProductsByCategory();
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

  toProduct(id: number | undefined) {
    this.router.navigate(['store' , 'produit' , id]);
  }

  fetchProductsByCategory(): void {
    this.productService
      .findAllArticleByCategory({ idCategory: this.idCategory })
      .subscribe({
        next: (data) => {
          this.products = data;
        }
      });
  }

  onInputChange() {
    this.showButton = true;
  }

  searchProduct() {
    // @ts-ignore
    this.products = this.products.filter( p => p.prixUnitaireHt >= this.minPrice && p.prixUnitaireHt <= this.maxPrice);
  }

  remove() {
    this.minPrice = '';
    this.maxPrice = '';
    this.fetchProductsByCategory();
  }

  togglePriceSort() {
    this.isAscending = !this.isAscending;
    this.sortProductsByPrice();
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

  getButtonClass() {
    return this.isAscending ? 'asc' : 'desc'
  }
}
