import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FournisseurService} from "../../../services/services/services/fournisseur.service";
import {FournisseurDto} from "../../../services/services/models/fournisseur-dto";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  listeFournisseurs : FournisseurDto[] = [];
  errorMsg = '';
  page : number = 1;
  count : number = 0;
  tableSize : number = 5;
  excelData: any[] = [];
  fileName = 'fournisseurs.xlsx';
  constructor(
    private router : Router,
    private fournisseurService : FournisseurService
  ) { }

  ngOnInit(): void {
    this.findAllFournisseurs();
  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllFournisseurs();
  }

  findAllFournisseurs(){
    this.fournisseurService.findAll4().subscribe({
      next : (data)=>{
        this.listeFournisseurs = data
      },
      error : (err)=>{
        console.log(err);
      }
    })
  }

  nouveauFournisseur() {
    this.router.navigate(['admin' , 'new-fournisseur']);
  }

  deleteFournisseur(event : any){
    if(event === 'done'){
      this.findAllFournisseurs();
    }else{
      if(event === 400){
        this.errorMsg = "Impossible de supprimer un fournisseur déja avoir des commandefournisseur";
      }
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
          const fournisseur: FournisseurDto = {
            nom: data['nom'],
            prenom: data['prenom'],
            telephone: data['numTel'],
            email: data['email'],
            address: {
              street: data['street'],
              zipCode: data['zipCode'],
              city: data['city'],
              country: data['country'],
              houseNumber: data['houseNumber']
            }
          }
          console.log(fournisseur);
          this.fournisseurService.save5({body: fournisseur}).subscribe({
            next: (r) => {
              this.findAllFournisseurs();
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      );
    }
  }

  exportexcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listeFournisseurs);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
