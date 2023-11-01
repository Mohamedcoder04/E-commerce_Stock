import {Component, OnInit} from '@angular/core';
import {UtilisateurDto} from "../../../services/services/models/utilisateur-dto";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import {HelperService} from "../../../services/helper/helper.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/services/authService/auth.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  userDto: UtilisateurDto = {};
  role = 'store';

  constructor(
    private utilisateurService: UtilisateurService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.getUserId().subscribe({
      next : (data)=>{
        this.utilisateurService.findById1({
          idUtilisateur: data
        }).subscribe({
          next: (user) => {
            this.userDto = user
          }
        });
      }
    });
    this.authService.getRole().subscribe({
      next : (data)=>{
        if(data === 'store'){
          this.role === data
        }else{
          this.role = 'admin'
        }
      }
    });
  }

  updateUser(id: number | undefined) {
    this.router.navigate([this.role + '/new-utilisateur', id]);
  }
}
