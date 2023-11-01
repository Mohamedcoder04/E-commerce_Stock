import {Component, OnInit} from '@angular/core';
import {CommandeClientService} from "../../../../services/services/services/commande-client.service";
import {CommandeClientDto} from "../../../../services/services/models/commande-client-dto";
import {LigneCommandeClientDto} from "../../../../services/services/models/ligne-commande-client-dto";

@Component({
  selector: 'app-new-paiement',
  templateUrl: './new-paiement.component.html',
  styleUrls: ['./new-paiement.component.scss']
})
export class NewPaiementComponent implements OnInit {

  orders: CommandeClientDto[] = [];
  transactions: any[] = []; // Initialize transactions as an empty array
  lignes: Array<LigneCommandeClientDto> | undefined = [];

  constructor(
    private commandeService: CommandeClientService
  ) {
  }

  ngOnInit(): void {
    this.commandeService.find3ByOrderByCreationDateDesc().subscribe({
      next: (data) => {
        this.orders = data;
        this.createTransactions(this.orders);
      },
      error: (error) => {
      }
    });

  }

  createTransactions(orders: CommandeClientDto[]){
    orders.forEach(o=>{
      this.commandeService.listeLigneCommandeClientByCommande({ idCommande : o.id as number }).subscribe({
        next : (data)=>{
          data.forEach(l=>{
            this.transactions.push({
              id: l.id,
              title: l.productDto?.codeProduit,
              price: l.productDto?.prixUnitaireHt,
              status: o.etatCommande,
              imgSrc: l.productDto?.photo
            });
          })
        }
      })
    })
  }

}
