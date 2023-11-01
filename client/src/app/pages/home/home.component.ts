import {Component, OnInit} from '@angular/core';
import {ProductDto} from "../../services/services/models/product-dto";
import {CartDto} from "../../services/services/models/cart-dto";
import {ProductService} from "../../services/services/services/product.service";
import {CartService} from "../../services/services/services/cart.service";
import {Router} from "@angular/router";
import {HelperService} from "../../services/helper/helper.service";
import {UtilisateurDto} from "../../services/services/models/utilisateur-dto";
import {UtilisateurService} from "../../services/services/services/utilisateur.service";
import {GenerateNextService} from "../../services/services/next/generate-next.service";
import {MvtStkService} from "../../services/services/services/mvt-stk.service";
import {ToastrService} from "ngx-toastr";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listProduct : ProductDto[] = [];
  cartObj : CartDto = {};
  utilisateur : UtilisateurDto = {}
  page : number = 1;
  count : number = 0;
  tableSize : number = 6;
  errorMsg : string = '';
  n: number = 0;
  minPrice: string = '';
  maxPrice: string = '';
  showButton: boolean= false;
  isAscending: boolean = true;

  constructor(
    private productService : ProductService,
    private cartService : CartService,
    private router : Router,
    private helper : HelperService,
    private utilisateurService : UtilisateurService,
    private generateNextService : GenerateNextService,
    private mvtStkService : MvtStkService,
    private toastr : ToastrService
  ) {

  }

  ngOnInit(): void {
    this.findAllProducts();
    if(localStorage.getItem('token')){
      this.utilisateurService.findById1({
        idUtilisateur : this.helper.userId
      }).subscribe({
        next : (user)=>{
          this.utilisateur = user
        }
      })
    }
  }

  findAllProducts(){
    this.productService.findAllForHome().subscribe({
      next : (data)=>{
        this.listProduct = data;
      }
    })
  }

  onTableDataChange(event : any){
    this.page = event;
    if(this.minPrice.length> 0 || this.maxPrice.length> 0 ){
      this.searchProduct();
    }else{
      this.findAllProducts();
    }
  }

  async addItemToCart(product: ProductDto ) {
    this.n = await lastValueFrom(this.mvtStkService.stockArticle({ idArticle : product.id as number }));
    if(this.n > 0){
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
    }else{
      this.toastr.error('item out of stock');
    }


  }

  toProduct(id: number | undefined) {
    this.router.navigate(['store' , 'produit' , id]);
  }

  checkStock(product: ProductDto) : number {
    let n = 0;
    this.mvtStkService.stockArticle({ idArticle : product.id as number }).subscribe({
      next : (result)=>{
        n = result;
        console.log(n);
      }
    })
    return n;
  }

  onInputChange() {
    this.showButton = true;
  }


  async searchProduct() {
    await this.productService.getProductByPrix({
      min : +this.minPrice,
      max : +this.maxPrice
    }).subscribe({
      next : (result)=>{
        this.listProduct = result;
      }
    })
  }

  remove() {
    this.minPrice = '';
    this.maxPrice = '';
    this.findAllProducts();
  }

  togglePriceSort() {
    this.isAscending = !this.isAscending;
    this.sortProductsByPrice();
  }

  sortProductsByPrice() {
    if (this.isAscending) {
      // @ts-ignore
      this.listProduct.sort((a, b) => a.prixUnitaireHt - b.prixUnitaireHt); // Tri ascendant par prix
    } else {
      // @ts-ignore
      this.listProduct.sort((a, b) => b.prixUnitaireHt - a.prixUnitaireTtc); // Tri descendant par prix
    }
  }

  getButtonClass() {
    return this.isAscending ? 'asc' : 'desc'
  }
}
