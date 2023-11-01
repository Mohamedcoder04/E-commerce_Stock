import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {PageDashboardComponent} from './pages/page-dashboard/page-dashboard.component';
import {StaticsComponent} from './pages/statics/statics.component';
import {MenuComponent} from './component/menu/menu.component';
import {HeaderComponent} from './component/header/header.component';
import {ArticleComponent} from './pages/articles/article/article.component';
import {DetailArticleComponent} from './component/detail-article/detail-article.component';
import {PaginationComponent} from './component/pagination/pagination.component';
import {ButtonActionsComponent} from './component/buuton-actions/button-actions.component';
import {NewArticleComponent} from './pages/articles/new-article/new-article.component';
import {MvtstkComponent} from './pages/mvtstk/mvtstk/mvtstk.component';
import {DetailMvtStkArticleComponent} from './component/detail-mvt-stk-article/detail-mvt-stk-article.component';
import {DetailMvtStkComponent} from './component/detail-mvt-stk/detail-mvt-stk.component';
import {DetailClientFournisseurComponent} from './component/detail-client/detail-client-fournisseur.component';
import {ClientComponent} from "./pages/clients/client/client.component";
import {FournisseurComponent} from './pages/fournisseurs/fournisseur/fournisseur.component';
import {NewClientFournisseurComponent} from './component/new-client-fournisseur/new-client-fournisseur.component';
import {DetailCmdCltFrsComponent} from './component/detail-cmd-clt-frs/detail-cmd-clt-frs.component';
import {DetailCmdComponent} from './component/detail-cmd/detail-cmd.component';
import {CmdCltFrsComponent} from './pages/cmd-clt-frs/cmd-clt-frs.component';
import {NewCmdComponent} from './component/new-cmd/new-cmd.component';
import {CategorieComponent} from './pages/categories/categorie/categorie.component';
import {NewCategorieComponent} from './pages/categories/new-categorie/new-categorie.component';
import {UtilisateurComponent} from './pages/user/utilisateur/utilisateur.component';
import {NewUtilisateurComponent} from './pages/user/new-utilisateur/new-utilisateur.component';
import {DetailUtilisateurComponent} from './component/detail-utilisateur/detail-utilisateur.component';
import {ProfilComponent} from './pages/user/profil/profil.component';
import {UpdatePasswordComponent} from './pages/user/update-password/update-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpIntercepteurService} from "./services/intecepteur/http-intercepteur.service";
import {TestUserComponent} from './pages/test-user/test-user/test-user.component';
import {LoaderComponent} from './component/loader/loader.component';
import {HomeComponent} from './pages/home/home.component';
import {CartePageComponent} from './pages/carte-page/carte-page.component';
import {SaleComponent} from './pages/sale/sale.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {StoreComponent} from './pages/store/store.component';
import {UpdateProfilComponent} from './pages/user/update-profil/update-profil.component';
import {HeaderStoreComponent} from './pages/header-store/header-store.component';
import {FooterStoreComponent} from './pages/footer-store/footer-store.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListOrdersComponent} from './pages/store/list-orders/list-orders.component';
import {InfoClientComponent} from './pages/store/info-client/info-client.component';
import {PaiementComponent} from './pages/store/paiement/paiement.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategoriePageComponent } from './pages/store/categorie-page/categorie-page.component';
import { SuccessComponent } from './pages/store/success/success.component';
import { SearchProductComponent } from './pages/store/search-product/search-product.component';
import { BestSellerComponent } from './pages/store/best-seller/best-seller.component';
import {ToastrModule} from "ngx-toastr";
import { TopWidgComponent } from './pages/statics/admin/top-widg/top-widg.component';
import { OrdersByMonthComponent } from './pages/statics/admin/orders-by-month/orders-by-month.component';
import { OrdersByCategoryComponent } from './pages/statics/admin/orders-by-category/orders-by-category.component';
import { NewPaiementComponent } from './pages/statics/admin/new-paiement/new-paiement.component';
import { TopProductsComponent } from './pages/statics/admin/top-products/top-products.component';
import {ChartModule} from "angular-highcharts";
import { ContactUsComponent } from './pages/store/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageDashboardComponent,
    StaticsComponent,
    MenuComponent,
    HeaderComponent,
    ArticleComponent,
    DetailArticleComponent,
    PaginationComponent,
    ButtonActionsComponent,
    NewArticleComponent,
    MvtstkComponent,
    DetailMvtStkArticleComponent,
    DetailMvtStkComponent,
    ClientComponent,
    DetailClientFournisseurComponent,
    FournisseurComponent,
    NewClientFournisseurComponent,
    DetailCmdCltFrsComponent,
    DetailCmdComponent,
    CmdCltFrsComponent,
    NewCmdComponent,
    CategorieComponent,
    NewCategorieComponent,
    UtilisateurComponent,
    NewUtilisateurComponent,
    DetailUtilisateurComponent,
    ProfilComponent,
    UpdatePasswordComponent,
    TestUserComponent,
    LoaderComponent,
    HomeComponent,
    CartePageComponent,
    SaleComponent,
    ProductPageComponent,
    StoreComponent,
    UpdateProfilComponent,
    HeaderStoreComponent,
    FooterStoreComponent,
    PageNotFoundComponent,
    ListOrdersComponent,
    InfoClientComponent,
    PaiementComponent,
    CategoriePageComponent,
    SuccessComponent,
    SearchProductComponent,
    BestSellerComponent,
    TopWidgComponent,
    OrdersByMonthComponent,
    OrdersByCategoryComponent,
    NewPaiementComponent,
    TopProductsComponent,
    ContactUsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        ChartModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpIntercepteurService,
    multi: true
  },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
