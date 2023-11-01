import {Component, Input, OnInit} from '@angular/core';
import {LigneCommandeClientDto} from "../../services/services/models/ligne-commande-client-dto";

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.scss']
})
export class DetailCmdComponent implements OnInit {

  @Input()
  ligneCommande : any;


  constructor() { }

  ngOnInit(): void {
  }

}
