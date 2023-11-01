import {Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../services/services/models/authentication-request";
import {AuthenticationService} from "../../services/services/services/authentication.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/user/token-storage.service";
import {AuthService} from "../../services/services/authService/auth.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMessages: Array<String> = [];

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private authService : AuthService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.errorMessages = [];
    this.authenticationService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: async (data) => {
        await localStorage.setItem('token', data.accessToken as string);
        const helper = new JwtHelperService();
        if (data.accessToken != null) {
          var decodedToken = helper.decodeToken(data.accessToken);
          this.authService.setFullNameForStore(decodedToken.fullName);
          this.authService.setLogged(true);
          this.authService.setUserId(decodedToken.userId);
        }
        if (decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
          this.authService.setRole('admin');
          await this.router.navigate(['admin','statics']);
        } else if (decodedToken.authorities[0].authority === "ROLE_USER") {
          this.authService.setRole('user');
          await this.router.navigate(['admin','statics']);
        } else {
          this.authService.setRole('store');
          await this.router.navigate(['store']);
        }
      }, error: (err) => {
        err.error.errors.forEach( (e: string | undefined) =>{
          this.toastrService.error( e );
        })
      }
    });
  }
}
