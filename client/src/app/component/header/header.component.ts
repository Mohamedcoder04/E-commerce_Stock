import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from "../../services/helper/helper.service";
import {NavigationEnd, Router} from "@angular/router";
import {NotificationDto} from "../../services/services/models/notification-dto";
import {NotificationService} from "../../services/services/services/notification.service";
import {GenerateNextService} from "../../services/services/next/generate-next.service";
import {SearchService} from "../../services/services/search/search.service";
import {AuthService} from "../../services/services/authService/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  fullName : string = "";
  notifications: Array<NotificationDto> = [];
  textSearch: string = '';
  isLogin: boolean = false;
  userId = -1;
  constructor(
    private helper : HelperService,
    private router : Router,
    private notificationService : NotificationService,
    private generateNextService : GenerateNextService,
    private searchService : SearchService,
    private authService : AuthService
  ) {
    this.generateNextService.notificationSubject.subscribe({
      next: () => {
        this.findAllNotifications();
      }
    });
  }

  ngOnInit(): void {
      //this.fullName = this.helper.userName
    this.authService.getLogged().subscribe({ next : (log)=>{
      this.isLogin = log;
    }});

    this.authService.getUserId().subscribe(val => {
      console.log(val);
      this.userId = val;
    });

    this.findAllNotifications();

  }

  logout() {
    this.isLogin = false;
    this.authService.setLogged(false);
    localStorage.clear();
    this.router.navigate(['store']);
  }

  toUrl(notification: NotificationDto) {
    this.notificationService.delete3({ id : notification.id as number }).subscribe({next : ()=>{
      this.generateNextService.notificationSubject.next(true);
    }});
    if(notification.url) this.router.navigateByUrl(notification.url);
  }

  private findAllNotifications() {
    this.notificationService.findAll3().subscribe({
      next : (data)=>{
        this.notifications = data;
      }
    })
  }

  search() {
    this.searchService.updateSearch(this.textSearch);
  }
}

