import {Component, OnInit} from '@angular/core';
import {CommandeClientDto} from "../../../services/services/models/commande-client-dto";
import {CommandeClientService} from "../../../services/services/services/commande-client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LigneCommandeClientDto} from "../../../services/services/models/ligne-commande-client-dto";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  orders: Array<CommandeClientDto> = [];
  fetchError = false;
  noOrders = false;
  page : number = 1;
  count : number = 0;
  tableSize : number = 4;
  len = 0;
  totauxParCommande: { [idCommande : number] : number} = {};

  innerLoading = true;
  userId = -1;

  constructor(
    private cmdClientService: CommandeClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = +params['id']; // Utilisez le signe "+" pour convertir l'ID de chaîne en nombre
      if (this.userId > -1) {
        this.findAllCommandeClient();
      }
    });

  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllCommandeClient();
  }

  /*
  convertDate(date: number) {
    return getLocaleDate(date);
  }
   */

  goToItem(id: number | undefined) {
      this.router.navigate(['store','produit' , id]);
  }

  private findAllCommandeClient() {
    this.cmdClientService.findAllCommandeClientByUtilisateurId({ id : this.userId }).subscribe((data) => {
      this.orders = data;
      console.log(this.orders);
      this.orders.forEach(order=>{
        this.cmdClientService.listeLigneCommandeClientByCommande({
          idCommande : order.id as number
        }).subscribe({
          next : (lignes)=>{
            order.ligneCommandeClients = lignes;
            this.len = lignes.length;

            let totalPrixUnitaire = 0;
            order.ligneCommandeClients.forEach(l=>{
              if(l && l.prixUnitaire){
                totalPrixUnitaire = l.prixUnitaire
              }

            })
            this.totauxParCommande[order.id || -1] = totalPrixUnitaire;
          }
        })
      })

      this.innerLoading = false;
    });
  }
}
