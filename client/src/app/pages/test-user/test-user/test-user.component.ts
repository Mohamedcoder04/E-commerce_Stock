import { Component, OnInit } from '@angular/core';
import {HelperService} from "../../../services/helper/helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.scss']
})
export class TestUserComponent implements OnInit {

  fullName : string = "";
  constructor(
    private helper : HelperService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.fullName = this.helper.userName
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
