import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/services/services/product.service";
import {ProductDto} from "../../services/services/models/product-dto";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  @Input()
  productDto : ProductDto = {};
  @Output()
  deleteArticle = new EventEmitter();
  selectIdArticle = -1;
  constructor(
    private router : Router,
    private productService : ProductService
  ) { }

  ngOnInit(): void {

  }

  updateArticle() {
    this.router.navigate(['admin/new-article' , this.productDto.id]);
  }


  confirmDeleteArticle() {
    if(this.productDto.id){
      this.productService.delete2({
        idArticle : this.productDto.id
      }).subscribe({
        next : (res) =>{
          this.deleteArticle.emit('done')
        },
        error : err=>{
          this.deleteArticle.emit(err.error.errors)
        }
      })
    }
  }

}
