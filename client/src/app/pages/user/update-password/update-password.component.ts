import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ChangePasswordUtilisatuerDto} from "../../../services/services/models/change-password-utilisatuer-dto";
import {HelperService} from "../../../services/helper/helper.service";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import {UtilisateurDto} from "../../../services/services/models/utilisateur-dto";
import {AuthService} from "../../../services/services/authService/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  changePassword: ChangePasswordUtilisatuerDto = {};
  userDto: UtilisateurDto = {};
  testPassword: string | undefined = "";
  errorMessage: Array<string> = [];
  role = 'store';

  constructor(
    private router: Router,
    private helper: HelperService,
    private userService: UtilisateurService,
    private authService : AuthService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(): void {

    this.authService.getUserId().subscribe({
      next : (id)=>{
        this.userService.findById1(
          {idUtilisateur: id}
        ).subscribe({
          next: (data) => {
            this.userDto = data
          }
        })
      }
    })



    this.authService.getRole().subscribe({
      next : (data)=>{
        if(data === 'store'){
          this.role = data;
        }else{
          this.role = 'admin';
        }
      }
    })

  }

  updatePassword() {
    this.errorMessage = [];
    this.userService.updatePassword({
      body: this.changePassword, id: this.helper.userId
    }).subscribe({
      next: (data) => {
        console.log(data.password);
        this.router.navigate([this.role + '/profil'])
      },
      error: (err) => {
        //console.log(err);
        this.toastrService.error(err.error.message);
        /*
        err.error.errors.forEach( (e: string | undefined) =>{
          this.toastrService.error( e );
        })

         */
      }
    })
  }

}
