import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import {UtilisateurDto} from "../../../services/services/models/utilisateur-dto";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  users : UtilisateurDto[] = []
  page : number = 1;
  count : number = 0;
  tableSize : number = 6;
  fileName= 'users.xlsx';
  excelData: any[] = [];
  constructor(
    private router: Router,
    private userService : UtilisateurService
  ) {
  }

  ngOnInit(): void {
   this.findAllUser()
  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllUser();
  }

  findAllUser(){
    this.userService.findAll1({
      role : 'ROLE_USER'
    }).subscribe({
      next : (users)=>{
        this.users = users
      }
    })
  }
  nouvelUtilisateur() {
    this.router.navigate(['admin','new-utilisateur']);
  }

  deleteUser(event: any) {
    if(event === 'done'){
      this.findAllUser()
    }
  }

  exportexcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.users);

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
          let user : UtilisateurDto = {
            address : {
              country : data['country'],
              zipCode : data['zipCode'],
              houseNumber : data['houseNumber'],
              city : data['city'],
              street : data['street'],
            },
            nom : data['nom'],
            prenom : data['prenom'],
            password : data['password'],
            telephone : data['telephone'],
            email : data['email'],
            dateDeNaissance : data['dateDeNaissance']
          }
          //console.log(data);
          this.userService.save1({
            body: user
          }).subscribe({
            next: (u) => {
              this.findAllUser();
            },
            error: (err) => {
              console.log(err);
            }
          });
        });
    }
  }

}
