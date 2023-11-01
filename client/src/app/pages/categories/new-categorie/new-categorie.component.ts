import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDto} from "../../../services/services/models/category-dto";
import {CategorieService} from "../../../services/services/services/categorie.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-categorie',
  templateUrl: './new-categorie.component.html',
  styleUrls: ['./new-categorie.component.scss']
})
export class NewCategorieComponent implements OnInit {
  categorieDto : CategoryDto = {};
  errorsMsg : Array<string> = [];
  type : string = "nouveau"
  constructor(
    private router :Router,
    private categorieService : CategorieService,
    private activatedRoute : ActivatedRoute,
    private toastrService : ToastrService
  ) { }

  ngOnInit(): void {
    const idCat = this.activatedRoute.snapshot.params['idCategorie'];
    console.log(idCat);
    if(idCat){

      this.categorieService.getCategorieById({
        idCategory : idCat
      }).subscribe({
        next : (data)=>{
          this.categorieDto = data;
          this.type = "Modifier La"
        }
      });
    }
  }

  save(){
    this.categorieService.save9({
      body : this.categorieDto
    }).subscribe({
      next : (data)=>{
        this.router.navigate(['admin','categories']);
      },
      error : (err)=>{
        err.error.errors.forEach( (e: string | undefined) =>{
          this.toastrService.error( e );
        })
      }
    })
  }

  cancelClick() {
    this.router.navigate(['admin' ,'categories'])
  }
}
