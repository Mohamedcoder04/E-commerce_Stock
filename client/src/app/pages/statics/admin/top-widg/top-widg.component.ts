import {Component, OnInit} from '@angular/core';
import {CommandeClientService} from "../../../../services/services/services/commande-client.service";
import {PaiementService} from "../../../../services/services/services/paiement.service";
import {UtilisateurService} from "../../../../services/services/services/utilisateur.service";

@Component({
  selector: 'app-top-widg',
  templateUrl: './top-widg.component.html',
  styleUrls: ['./top-widg.component.scss']
})
export class TopWidgComponent implements OnInit {

  ordersNumber = 0;
  totalPaiements = 0;
  nomberUsers = 0;
  constructor(
    private cmdCltService: CommandeClientService,
    private paiementService : PaiementService,
    private userService : UtilisateurService
  ) {
  }

  ngOnInit(): void {
    this.cmdCltService.findAllLignesCommande().subscribe({
      next: (data) => {
        this.ordersNumber = data.length;
      }
    })
    this.paiementService.findSumAllPaiements().subscribe({
      next : (total)=>{
        this.totalPaiements = total;
      }
    })
    this.userService.getNumberUtilisateursByCommandeClients().subscribe({
      next : (n)=>{
        this.nomberUsers = n;
      }
    })
  }

}
