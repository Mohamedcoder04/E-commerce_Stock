import { Subscription, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import {ProductDto} from "../../../services/services/models/product-dto";
import {ProductService} from "../../../services/services/services/product.service";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  querySubscribe: Subscription | undefined;
  keyword: string = '';
  canFetch = false;
  page : number = 1;
  count : number = 0;
  tableSize : number = 6;
  products: Array<ProductDto> = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router : Router
  ) {
  }

  ngOnInit() {
    this.querySubscribe = this.activatedRoute.params.subscribe((params: Params) => {
      this.canFetch = false;
      this.keyword = params['keyword'];
      this.page = 0;
      this.findAllProducts();
    });
  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllProducts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.canFetch) {
      this.canFetch = false;
      if (this.canFetch) {
        this.productService.searchProducts({ keyword : this.keyword } )
          .pipe(take(1), catchError(
            error => {
              this.canFetch = false;
              return throwError(error);
            }
          ))
          .subscribe(data => {
            this.products.push(...data);
            this.page++;
            this.canFetch = true;
            if (data.length === 0) {
              this.canFetch = false;
            }
          });
      }
    }
  }

  toProduct(id: number | undefined) {
    this.router.navigate(['store' , 'produit' , id])
  }

  addItemToCart(product: ProductDto) {

  }

  private findAllProducts() {
    this.productService.searchProducts({ keyword : this.keyword})
      .pipe(take(1), catchError(
        error => {
          this.canFetch = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.products = data;
        this.canFetch = true;
        if (data.length !== 0) {
          this.canFetch = true;
        }
      });
  }
}
