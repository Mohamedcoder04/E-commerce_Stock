import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {HelperService} from "../../services/helper/helper.service";

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {

  fullName : string = '';

  constructor(
    private router : Router,
    private helper : HelperService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.fullName = this.helper.userName
    }
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/admin') {
        // Appel de ngOnInit() lors d'un changement de route vers '/admin'
        this.ngOnInit();
      }
    });


  }

}
