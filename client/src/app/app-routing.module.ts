import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {PageDashboardComponent} from "./pages/page-dashboard/page-dashboard.component";
import {StaticsComponent} from "./pages/statics/statics.component";
import {ArticleComponent} from "./pages/articles/article/article.component";
import {NewArticleComponent} from "./pages/articles/new-article/new-article.component";
import {MvtstkComponent} from "./pages/mvtstk/mvtstk/mvtstk.component";
import {ClientComponent} from "./pages/clients/client/client.component";
import {FournisseurComponent} from "./pages/fournisseurs/fournisseur/fournisseur.component";
import {NewClientFournisseurComponent} from "./component/new-client-fournisseur/new-client-fournisseur.component";
import {CmdCltFrsComponent} from "./pages/cmd-clt-frs/cmd-clt-frs.component";
import {NewCmdComponent} from "./component/new-cmd/new-cmd.component";
import {CategorieComponent} from "./pages/categories/categorie/categorie.component";
import {NewCategorieComponent} from "./pages/categories/new-categorie/new-categorie.component";
import {UtilisateurComponent} from "./pages/user/utilisateur/utilisateur.component";
import {NewUtilisateurComponent} from "./pages/user/new-utilisateur/new-utilisateur.component";
import {ProfilComponent} from "./pages/user/profil/profil.component";
import {UpdatePasswordComponent} from "./pages/user/update-password/update-password.component";
import {AdminGuardService} from "./services/guard/admin-guard/admin-guard.service";
import {TokenGuardService} from "./services/guard/tokenGuard/token-guard.service";
import {TestUserComponent} from "./pages/test-user/test-user/test-user.component";
import {HomeComponent} from "./pages/home/home.component";
import {CartePageComponent} from "./pages/carte-page/carte-page.component";
import {SaleComponent} from "./pages/sale/sale.component";
import {StoreComponent} from "./pages/store/store.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {ListOrdersComponent} from "./pages/store/list-orders/list-orders.component";
import {InfoClientComponent} from "./pages/store/info-client/info-client.component";
import {PaiementComponent} from "./pages/store/paiement/paiement.component";
import {CategoriePageComponent} from "./pages/store/categorie-page/categorie-page.component";
import {SuccessComponent} from "./pages/store/success/success.component";
import {SearchProductComponent} from "./pages/store/search-product/search-product.component";
import {BestSellerComponent} from "./pages/store/best-seller/best-seller.component";
import {ContactUsComponent} from "./pages/store/contact-us/contact-us.component";
import {EmployeGuardService} from "./services/guard/employe/employe-guard.service";

const routes: Routes = [


  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full'
  },
  {
    path: 'store',
    component: StoreComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'produit/:id',
        component: ProductPageComponent
      },
      {
        path: 'new-utilisateur/:idUser',
        component: NewUtilisateurComponent,
        canActivate : [TokenGuardService]
      }
      ,
      {
        path: 'profil',
        component: ProfilComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'paiement',
        component: PaiementComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'categorie/:id',
        component: CategoriePageComponent
      },
      {
        path: 'info-client',
        component: InfoClientComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'info-client/:id/:quantity',
        component: InfoClientComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'orders/:id',
        component: ListOrdersComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'contact',
        component: ContactUsComponent
      },
      {
        path: 'changer-mot-de-passe',
        component: UpdatePasswordComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'sale',
        component: SaleComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'success',
        component: SuccessComponent,
        canActivate : [TokenGuardService]
      },
      {
        path: 'most-selling',
        component: BestSellerComponent
      },
      {
        path: 'search/:keyword',
        component: SearchProductComponent
      }
    ]
  },
  {
    path: 'admin',
    component: PageDashboardComponent,
    canActivate: [EmployeGuardService, TokenGuardService],
    children: [
      {
        path: 'statics',
        component: StaticsComponent
      },
      {
        path: 'articles',
        component: ArticleComponent
      },
      {
        path: 'new-article',
        component: NewArticleComponent
      }, {
        path: 'new-article/:idArticle',
        component: NewArticleComponent
      },
      {
        path: 'mvtstk',
        component: MvtstkComponent
      },
      {
        path: 'clients',
        component: ClientComponent
      },
      {
        path: 'fournisseurs',
        component: FournisseurComponent
      },
      {
        path: 'new-fournisseur',
        component: NewClientFournisseurComponent,
        data: {
          origin: 'fournisseur'
        }
      }, {
        path: 'new-fournisseur/:id',
        component: NewClientFournisseurComponent,
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'new-client',
        component: NewClientFournisseurComponent,
        data: {
          origin: 'client'
        }
      }, {
        path: 'new-client/:id',
        component: NewClientFournisseurComponent,
        data: {
          origin: 'client'
        }
      },
      {
        path: 'commande-client',
        component: CmdCltFrsComponent,
        data: {
          origin: 'client'
        }
      },
      {
        path: 'commande-fournisseur',
        component: CmdCltFrsComponent,
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'new-commande-client',
        component: NewCmdComponent,
        data: {
          origin: 'client'
        }
      },
      {
        path: 'new-commande-fournisseur',
        component: NewCmdComponent,
        data: {
          origin: 'fournisseur'
        }
      },
      {
        path: 'new-categorie',
        component: NewCategorieComponent
      }, {
        path: 'update-categorie/:idCategorie',
        component: NewCategorieComponent
      },
      {
        path: 'new-utilisateur',
        component: NewUtilisateurComponent
      },
      {
        path: 'new-utilisateur/:idUser',
        component: NewUtilisateurComponent
      },
      {
        path: 'categories',
        component: CategorieComponent
      },
      {
        path: 'utilisateurs',
        component: UtilisateurComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'profil',
        component: ProfilComponent
      },
      {
        path: 'changer-mot-de-passe',
        component: UpdatePasswordComponent
      }
    ]
  }
  , {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
