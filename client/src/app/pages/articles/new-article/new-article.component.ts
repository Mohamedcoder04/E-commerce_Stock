import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDto} from "../../../services/services/models/category-dto";
import {CategorieService} from "../../../services/services/services/categorie.service";
import {PhotoService} from "../../../services/services/services/photo.service";
import {ProductDto} from "../../../services/services/models/product-dto";
import {ProductService} from "../../../services/services/services/product.service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {
  articleDto: ProductDto = {};
  categorieDto: CategoryDto = {};
  listeCategories: CategoryDto[] = [];
  errorMsg: Array<string> = [];
  idArticleToUpdate = -1;
  file: File | null = null;
  imgUrl: string | ArrayBuffer = 'assets/new-product.png';

  constructor(
    private router: Router,
    private productService: ProductService,
    private categorieService: CategorieService,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(): void {
    this.categorieService.findAll8().subscribe({
      next: (data) => {
        this.listeCategories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.idArticleToUpdate = this.activatedRoute.snapshot.params['idArticle'];
    if (this.idArticleToUpdate) {
      this.productService.findById2({
        idArticle: this.idArticleToUpdate
      }).subscribe({
        next: (data) => {
          this.articleDto = data;
          console.log(data);
          if (data.category)
            this.categorieDto = data.category;
            if(this.articleDto.photo){
              this.imgUrl = this.articleDto.photo
            }
        }
      })
    }
  }

  cancelClick() {
    this.router.navigate(['admin', 'articles'])
  }

  addArticle() {
    this.errorMsg = [];
    this.articleDto.category = this.categorieDto;
    this.productService.save2({
      body: this.articleDto
    }).subscribe({
      next: (data) => {
        this.savePhoto(data.id, data.codeProduit);
      },
      error: (err) => {
        err.error.errors.forEach( (e: string | undefined) =>{
          this.toastrService.error( e );
        })
      }
    })
  }


  calculerTTC() {
    if (this.articleDto.prixUnitaireHt && this.articleDto.tauxTva) {
      // pour récpérer un nombre on ajoute "+" avant le nombre
      this.articleDto.prixUnitaireTtc = +this.articleDto.prixUnitaireHt + (+((this.articleDto.prixUnitaireHt * this.articleDto.tauxTva) / 100));
    }
  }


  onFileInput(files: FileList | null) {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            console.log(fileReader.result);
            this.imgUrl = fileReader.result
            //console.log(this.imgUrl);
          }
        }
      }
    }
  }

  savePhoto(idArticle: number | undefined, titre: string | undefined) {
    if (idArticle && titre && this.file) {
      const params: any = {
        context: 'article',
        id: idArticle,
        title: titre,
        body : {
          file: this.file
        }
      }
      console.log(params);
      debugger
      this.photoService.savePhoto(params).subscribe({
        next: (data) => {
          this.router.navigate(['admin', 'articles'])
        },
        error: err => {
          console.log(err);
        }
      })
    } else {
      this.router.navigate(['admin', 'articles'])
    }
  }

}
