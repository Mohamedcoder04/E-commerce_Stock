import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandeClientService} from "../../services/services/services/commande-client.service";
import {CommandeFournisseurService} from "../../services/services/services/commande-fournisseur.service";
import {LigneCommandeClientDto} from "../../services/services/models/ligne-commande-client-dto";


@Component({
  selector: 'app-cmd-clt-frs',
  templateUrl: './cmd-clt-frs.component.html',
  styleUrls: ['./cmd-clt-frs.component.scss']
})
export class CmdCltFrsComponent implements OnInit {
  page : number = 1;
  count : number = 0;
  tableSize : number = 3;
  origin = '';
  listCmdCltFrs : Array<any> = [];
  lignesCommandes = new Map();
  totalCommandes = new Map();
  total = 0;

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private commandeClientService : CommandeClientService,
    private commandeFournisseurService : CommandeFournisseurService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe({
      next : (data)=>{
        this.origin = data['origin'];
      }
    })

    this.findAllCmd();
  }

  findAllCmd(){
    if(this.origin == 'client'){
      this.commandeClientService.findAll6().subscribe({
        next : (data)=>{
          this.listCmdCltFrs = data;
          this.findLigneCommandes();
        }
      })
    }else if(this.origin == 'fournisseur'){
      this.commandeFournisseurService.findAll5().subscribe({
        next : (data)=>{
          this.listCmdCltFrs = data;
          this.findLigneCommandes();
        }
      })
    }
  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllCmd();
  }

  nouveauCommande() {
    if(this.origin == 'client'){
      this.router.navigate(['admin' , 'new-commande-client']);
    }else if(this.origin == 'fournisseur'){
      this.router.navigate(['admin' , 'new-commande-fournisseur']);
    }
  }

  findAllLigneCmd(idCmd : number | undefined){
    if(this.origin == 'client'){
      this.commandeClientService.listeLigneCommandeClientByCommande({
        idCommande : idCmd as number}).subscribe({
        next : (data)=>{
          this.lignesCommandes.set(idCmd , data);
          this.totalCommandes.set(idCmd, this.calculTotalCmd(data))
        }
      })
    }else if(this.origin == 'fournisseur'){
      this.commandeFournisseurService.findAllLigneCommande({
        idCommande : idCmd as number
      }).subscribe({
        next : (data)=>{
          this.lignesCommandes.set(idCmd, data);
          this.totalCommandes.set(idCmd, this.calculTotalCmd(data))
        }
      })
    }
  }

  private findLigneCommandes() {
    this.listCmdCltFrs.forEach(
      cmd=>{
        this.findAllLigneCmd(cmd.id)
      }
    )
  }

  calculTotalCmd(data: Array<LigneCommandeClientDto>) : number {
    let n = 0;
    data.forEach(ligne=>{
      if(ligne.quantite && ligne.prixUnitaire)
        n += ligne.prixUnitaire
    })
    return Math.floor(n);
  }
  calculerTotal(id : number | undefined){
    return this.totalCommandes.get(id);
  }

}
