import { Component, OnInit } from '@angular/core';
import {UtilisateurDto} from "../../services/services/models/utilisateur-dto";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/services/authentication.service";
import {AddressDto} from "../../services/services/models/address-dto";
import {Role} from "../../services/services/models/role";
import {ClientDto} from "../../services/services/models/client-dto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userDto : UtilisateurDto = {};
  address : AddressDto = {};
  errorMessages : Array<string> = [];

  constructor(
    private router : Router,
    private authService : AuthenticationService,
    private toastrService : ToastrService
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.errorMessages = [];
    this.userDto.address = this.address;
    this.authService.register({
      body : this.userDto
    }).subscribe({
      next : (data)=>{
        this.toastrService.success("Félicitations ! Votre inscription est complète");
        this.router.navigate(['store','login']);
      },
      error : (err)=>{
        err.error.errors.forEach( (e: string | undefined) =>{
          this.toastrService.error( e );
        })
      }
    })
  }
}
