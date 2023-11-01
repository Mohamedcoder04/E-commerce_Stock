import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import * as XLSX from 'xlsx';
import {ClientService} from "../../../services/services/services/client.service";
import {ClientDto} from "../../../services/services/models/client-dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  listClients: any[] = [];
  errorMsg = '';
  page: number = 1;
  count: number = 0;
  excelData: any[] = [];
  tableSize: number = 5;
  fileName = 'clients.xlsx';

  constructor(
    private router: Router,
    private userService: UtilisateurService,
    private clientService: ClientService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(): void {
    this.findAllClients();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.findAllClients();
  }

  findAllClients() {
    this.userService.findAll1({
      role: 'ROLE_CLIENT'
    }).subscribe({
      next: (data) => {
        this.listClients = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  nouvelClient() {
    this.router.navigate(['admin', 'new-client'])
  }

  deleteClient(event: any) {
    if (event === 'done') {
      this.findAllClients()
    } else {
      if (event === 400) {
        this.toastrService.error("Impossible de supprimer un client qui a déjà des commandes");
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
          const client: ClientDto = {
            nom: data['nom'],
            prenom: data['prenom'],
            telephone: data['numTel'],
            email: data['email'],
            adresse: {
              street: data['street'],
              zipCode: data['zipCode'],
              city: data['city'],
              country: data['country'],
              houseNumber: data['houseNumber']
            }
          }
          console.log(client);
          this.clientService.save8({body: client}).subscribe({
            next: (r) => {
              this.findAllClients();
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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listClients);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
