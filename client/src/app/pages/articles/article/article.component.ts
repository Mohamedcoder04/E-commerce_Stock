import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/services/services/product.service";
import {ProductDto} from "../../../services/services/models/product-dto";
import * as XLSX from 'xlsx';
import {CategoryDto} from "../../../services/services/models/category-dto";
import {CategorieService} from "../../../services/services/services/categorie.service";
import {SearchService} from "../../../services/services/search/search.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: Array<ProductDto> = [];
  errorMsg: Array<string> = []
  excelData: any[] = [];
  categoryDto: CategoryDto = {}
  page : number = 1;
  count : number = 0;
  tableSize : number = 4;
  fileName= 'produits.xlsx';
  private originalArticles: ProductDto[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategorieService,
    private searchService : SearchService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(): void {
    this.findAllArticles();
    this.searchService.newSearch.subscribe({
      next : (r)=>{
        console.log(r);
        this.resultSearch(r);
      }
    })
  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllArticles();
  }

  nouvelArticle(): void {
    this.router.navigate(['admin', 'new-article']);
  }


  private findAllArticles() {
    this.productService.findAll2().subscribe({
      next: (data) => {
        this.articles = data;
        this.originalArticles = [...this.articles];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  suppression(event: any) {
    if (event === 'done') {
      this.findAllArticles();
    } else {
      console.log(event);
      this.errorMsg = event;
    }
  }


  importData(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {type: 'binary'});
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      this.excelData.forEach(
        (data) => {
          //console.log(data);
          this.categoryService.findByCodeCategorie({
            codeCategory: data.categ
          }).subscribe({
            next: (cat) => {
              this.categoryDto = cat
              data.category = this.categoryDto;
              console.log(data);

              this.productService.save2({
                body: data
              }).subscribe({
                next: (result) => {
                  this.findAllArticles();
                },
                error: (err) => {
                  console.log(err);
                }
              })
            },
            error: (err) => {
              err.error.errors.forEach( (e: string | undefined) =>{
                this.toastrService.error( e );
              })
            }
          });

        });
    }
  }

  resultSearch(r: string) {
    this.articles = this.originalArticles.filter(p=> p.codeProduit?.toLowerCase().includes(r.toLowerCase()));
  }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.articles);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
