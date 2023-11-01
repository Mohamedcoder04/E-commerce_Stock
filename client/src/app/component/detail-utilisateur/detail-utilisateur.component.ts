import {Component, Input , EventEmitter, OnInit, Output} from '@angular/core';
import {UtilisateurDto} from "../../services/services/models/utilisateur-dto";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../services/services/services/utilisateur.service";

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss']
})
export class DetailUtilisateurComponent implements OnInit {

  @Input()
  user : UtilisateurDto = {};
  @Output()
  suppressionUser = new EventEmitter()
  constructor(
    private router : Router,
    private userService : UtilisateurService
  ) { }

  ngOnInit(): void {
  }

  updateUser(id : number | undefined) {
    this.router.navigate(['admin', 'new-utilisateur', id])
  }

  deleteUser() {
    this.userService.delete1({
      id: this.user.id as number
    }).subscribe({
      next : (data)=>{
        this.suppressionUser.emit('done')
      },
      error : (err)=>{
        this.suppressionUser.emit(err.error.message)
      }
    })
  }

  cancelDelete() {
    this.router.navigate(['admin', 'utilisateurs'])
  }
}
