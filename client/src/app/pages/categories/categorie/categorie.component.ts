import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CategorieService} from "../../../services/services/services/categorie.service";
import {HelperService} from "../../../services/helper/helper.service";
import {CategoryDto} from "../../../services/services/models/category-dto";
import * as XLSX from 'xlsx';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  categorieDto : CategoryDto[] = [];
  idCatToDelete = -1;
  codeCategorie : string = "";
  errorMessage: string = "";
  page : number = 1;
  count : number = 0;
  tableSize : number = 6;
  excelData: any[] = [];
  fileName= 'categories.xlsx';
  constructor(
    private router : Router,
    private categorieService : CategorieService,
    private toastrService : ToastrService
  ) { }

  ngOnInit(): void {
    this.findAllCategories()
  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllCategories();
  }

  private findAllCategories(){
    this.categorieService.findAll8().subscribe({
      next : (data)=>{
        this.categorieDto = data;
        this.errorMessage = '';
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }



  nouveauCategorie() {
    this.router.navigate(['admin','new-categorie']);
  }

  updateCategorie(id : number|undefined) {
    this.router.navigate(['admin' , 'update-categorie' , id])
  }

  cancelDelete() {
    this.idCatToDelete = -1;
  }

  changeUserState(id: number|undefined, codeCategorie : string|undefined) {    console.log(this.idCatToDelete)
    this.idCatToDelete = id as number;
    this.codeCategorie = codeCategorie as string;
  }


  deleteCatgorie() {
    if(this.idCatToDelete){
      this.categorieService.delete8({
        idCategory : this.idCatToDelete
      }).subscribe({
        next : (data) =>{
          this.findAllCategories();
        },error : (err)=>{
          if(err.status === 400){
            this.toastrService.error("Impossible de supprimer une catégorie déja contient des produits");
          }
          //console.log(err);
        }
      })
    }
  }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.categorieDto);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
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
          this.categorieService.save9({
            body : data
          }).subscribe({
            next: (cat) => {
              this.findAllCategories();
            },
            error: (err) => {
              console.log(err);
            }
          });

        });
    }
  }


}
