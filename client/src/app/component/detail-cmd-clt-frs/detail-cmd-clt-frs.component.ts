import {Component, Input, OnInit} from '@angular/core';
import {CommandeClientService} from "../../services/services/services/commande-client.service";
import {Router} from "@angular/router";
import {CommandeClientDto} from "../../services/services/models/commande-client-dto";

@Component({
  selector: 'app-detail-cmd-clt-frs',
  templateUrl: './detail-cmd-clt-frs.component.html',
  styleUrls: ['./detail-cmd-clt-frs.component.scss']
})
export class DetailCmdCltFrsComponent implements OnInit {

  @Input()
  origin = '';
  @Input()
  commande: any;
  cltFrs: any;

  track: string | undefined = '';

  constructor(
    private cmdCltService: CommandeClientService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.extractCltFrs();
  }

  extractCltFrs() {
    if (this.origin === 'client') {
      this.cltFrs = this.commande?.utilisateurDto;
    } else if (this.origin === 'fournisseur') {
      this.cltFrs = this.commande.fournisseur;
    }
  }


  addTrack(commande : CommandeClientDto | undefined) {

    if(commande){
      commande.trackingNumber = this.track;
      commande.etatCommande = "VALIDEE";
    }
    this.cmdCltService.save7({
      body: commande as CommandeClientDto
    }).subscribe({
      next: () => {
        this.router.navigate(['admin', 'commande-client']);
      }
    })
  }
}
