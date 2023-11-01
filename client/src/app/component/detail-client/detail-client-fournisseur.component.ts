import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientDto} from "../../services/services/models/client-dto";
import {Router} from "@angular/router";
import {FournisseurDto} from "../../services/services/models/fournisseur-dto";
import {ClientService} from "../../services/services/services/client.service";
import {FournisseurService} from "../../services/services/services/fournisseur.service";
import {UtilisateurService} from "../../services/services/services/utilisateur.service";

@Component({
  selector: 'app-detail-client-fournisseur',
  templateUrl: './detail-client-fournisseur.component.html',
  styleUrls: ['./detail-client-fournisseur.component.scss']
})
export class DetailClientFournisseurComponent implements OnInit {

  @Input()
  origin = '';
  @Input()
  cltFrsDto : any = {};
  @Output()
  supressionCltFrs = new EventEmitter();


  constructor(
    private router : Router,
    private userService : UtilisateurService,
    private fournisseurService : FournisseurService
  ) { }

  ngOnInit(): void {
  }

  updateCltFrs() {
     if(this.origin === 'client'){
        this.router.navigate(['admin' , 'new-client' , this.cltFrsDto.id]);
     }else if(this.origin === 'fournisseur'){
        this.router.navigate(['admin' , 'new-fournisseur' , this.cltFrsDto.id]);
     }
  }


  deleteCltFrs(){
    if(this.origin === 'client'){
      this.userService.delete1({
        id : this.cltFrsDto.id
      }).subscribe({
        next : (data)=>{
          this.supressionCltFrs.emit('done');
        },
        error : (err)=>{
          this.supressionCltFrs.emit(err.status)
        }
      })
    }else if(this.origin === 'fournisseur'){
      this.fournisseurService.delete4({
        idFournisseur : this.cltFrsDto.id
      }).subscribe({
        next : (data)=>{
          this.supressionCltFrs.emit('done');
        },
        error : (err)=>{
          this.supressionCltFrs.emit(err.status)
        }
      })
    }
  }

}
