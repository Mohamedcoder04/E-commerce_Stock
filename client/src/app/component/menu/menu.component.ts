import { Component, OnInit } from '@angular/core';
import {Menu} from "./menu";
import {Router} from "@angular/router";
import {AuthService} from "../../services/services/authService/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  role = "";
  constructor(
    private router : Router,
    private authService : AuthService
  ) {
  }

  public menuProperties : Array<Menu> = [
    {
      id: '1',
      titre : 'Tableau de bord',
      icon : 'fas fa-chart-line',
      url : '',
      sousMenu : [
        {
          id: '11',
          titre : 'Vue d\'ensemble',
          icon : 'fas fa-chart-pie',
          url : 'admin/statics',
          isAdminMenu : false
        }
        /*,
        {
          id: '12',
          titre : 'Statistiques',
          icon : 'fas fa-chart-bar',
          url : 'admin/statics',
        },*/
      ]
    },
    {
      id: '2',
      titre : 'Produits',
      icon : 'fas fa-boxes',
      url : '',
      sousMenu : [
        {
          id: '21',
          titre : 'Produits',
          icon : 'fas fa-boxes',
          url : 'admin/articles',
          isAdminMenu : false
        },
        {
          id: '22',
          titre: 'Mouvement stock',
          icon: 'fab fa-stack-overflow',
          url: 'admin/mvtstk',
          isAdminMenu : false
        },
      ]
    },
    {
      id: '3',
      titre : 'Clients',
      icon : 'fas fa-users',
      url : '',
      sousMenu : [
        {
          id: '31',
          titre : 'Clients',
          icon : 'fas fa-users',
          url : 'admin/clients',
          isAdminMenu : false
        },
        {
          id: '32',
          titre : 'Commandes',
          icon : 'fas fa-shopping-basket',
          url : 'admin/commande-client',
          isAdminMenu : false
        },
      ]
    },
    {
      id: '4',
      titre : 'Fournisseurs',
      icon : 'fas fa-users',
      url : '',
      sousMenu : [
        {
          id: '41',
          titre : 'Fournisseurs',
          icon : 'fas fa-users',
          url : 'admin/fournisseurs',
          isAdminMenu : false
        },
        {
          id: '42',
          titre : 'Commandes',
          icon : 'fas fa-truck',
          url : 'admin/commande-fournisseur',
          isAdminMenu : false
        },
      ]
    },
    {
      id: '5',
      titre : 'Paramétrages',
      icon : 'fas fa-cogs',
      url : '',
      sousMenu : [
        {
          id: '51',
          titre : 'Catégories',
          icon : 'fas fa-tools',
          url : 'admin/categories',
          isAdminMenu : false
        },
        {
          id: '52',
          titre : 'Utilisateurs',
          icon : 'fas fa-users-cog',
          url : 'admin/utilisateurs',
          isAdminMenu : true
        },
      ]
    },
  ];

  private lastSelectedMenu : Menu | undefined;

  ngOnInit(): void {
    this.authService.getRole().subscribe({
      next : (data)=>{
        this.role = data;
      }
    })
  }

  navigate(menu : Menu) : void{
    if(this.lastSelectedMenu){
      this.lastSelectedMenu.active = false;
    }
    menu.active = true;
    this.router.navigate([menu.url]);
    this.lastSelectedMenu = menu;
  }
}
