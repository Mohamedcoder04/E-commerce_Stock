import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MvtStkDto} from "../../services/services/models/mvt-stk-dto";
import {MvtStkService} from "../../services/services/services/mvt-stk.service";
import {EnumValue} from "ng-openapi-gen/lib/enum-value";
import {Router} from "@angular/router";
import {ProductDto} from "../../services/services/models/product-dto";
import {ProductService} from "../../services/services/services/product.service";

@Component({
  selector: 'app-detail-mvt-stk-article',
  templateUrl: './detail-mvt-stk-article.component.html',
  styleUrls: ['./detail-mvt-stk-article.component.scss']
})
export class DetailMvtStkArticleComponent implements OnInit {

  @Input()
  product : ProductDto = {};
  @Input()
  totalStock = 0
  @Output()
  updateListMvstk = new EventEmitter();
  quantite = 0;
  typeSelect = '';
  mvstk: MvtStkDto = {};

  constructor(
    private mvtService : MvtStkService,
    private productService : ProductService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  correctionStock(id: number | undefined) {
    this.mvstk.productDto = this.product
    console.log(this.typeSelect);
    if(this.typeSelect === 'positif'){
      console.log(this.mvstk)
      this.mvtService.correctionStockPositif({
        body : this.mvstk
      }).subscribe({
        next : (data)=>{
          this.updateListMvstk.emit('done');
        },
        error : (err)=>{
          this.updateListMvstk.emit(err.error.errors);
        }
      })
    }else if(this.typeSelect === 'negatif'){
      this.mvtService.correctionStockNegatif({
        body : this.mvstk
      }).subscribe({
        next : (data)=>{
          this.updateListMvstk.emit('done');
        },
        error : (err)=>{
          this.updateListMvstk.emit(err.error.errors);
        }
      })
    }
  }
}
