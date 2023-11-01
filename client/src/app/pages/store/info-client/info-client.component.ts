import {Component, OnInit} from '@angular/core';
import {AddressDto} from "../../../services/services/models/address-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {PaiementService} from "../../../services/services/services/paiement.service";
import {CommandeClientService} from "../../../services/services/services/commande-client.service";
import {LigneCommandeClientDto} from "../../../services/services/models/ligne-commande-client-dto";
import {CommandeClientDto} from "../../../services/services/models/commande-client-dto";
import {CartService} from "../../../services/services/services/cart.service";
import {ProductDto} from "../../../services/services/models/product-dto";
import {CartDto} from "../../../services/services/models/cart-dto";
import {HelperService} from "../../../services/helper/helper.service";
import {ProductService} from "../../../services/services/services/product.service";
import {PaiementDto} from "../../../services/services/models/paiement-dto";
import {LivraisonInfoDto} from "../../../services/services/models/livraison-info-dto";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import {UtilisateurDto} from "../../../services/services/models/utilisateur-dto";
import {NotificationService} from "../../../services/services/services/notification.service";
import {NotificationDto} from "../../../services/services/models/notification-dto";
import {AuthService} from "../../../services/services/authService/auth.service";
import {GenerateNextService} from "../../../services/services/next/generate-next.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit {

  addressDto: AddressDto = {};
  days: Array<number> = [];
  months: Array<number> = [];
  lignesCmdClt: Array<LigneCommandeClientDto> = [];
  products: Array<ProductDto> = [];
  productDto: ProductDto = {};
  cartProducts: CartDto[] = [];
  userDto: UtilisateurDto = {};
  cardOwner: any;
  cardNo: any;
  month: any;
  year: any;
  cardCCV: any;
  errorMsg: Array<String> = [];
  livraisonInfo: LivraisonInfoDto = {};
  prix = 0;
  idProduct = -1;
  quantity = 1;
  paiement : PaiementDto = {};


  constructor(
    private router: Router,
    private userService: UtilisateurService,
    private paiementService: PaiementService,
    private cmdClientService: CommandeClientService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private helper: HelperService,
    private productService: ProductService,
    private notificationService: NotificationService,
    private authService : AuthService,
    private generateNextService : GenerateNextService,
    private toastrService : ToastrService
  ) {

  }

  ngOnInit(): void {
    this.days = [...Array(12).keys()].map(i => i + 1);
    this.months = [...Array(20).keys()].map(i => i + 2023);
    this.userService.findById1({
      idUtilisateur: this.helper.userId
    }).subscribe({
      next: (user) => {
        this.userDto = user;
      }
    })
    this.idProduct = this.activatedRoute.snapshot.params['id'];
    this.quantity = this.activatedRoute.snapshot.params['quantity'];
    if (this.idProduct) {
      this.productService.findById2({
        idArticle: this.idProduct
      }).subscribe({
        next: (result) => {
          this.productDto = result;
          console.log(this.productDto);
        }
      });
    }
    else {
      this.authService.getUserId().subscribe({
        next : (data)=>{
          this.cartService.findAllCartByUtilisateurId({id: this.helper.userId})
            .subscribe({
              next: (carts) => {
                carts.forEach(c => {
                  if (c && c.product){
                    let product : ProductDto = c.product;
                    product.quantity = c.quantity
                    this.products.push(product);
                  }
                })
              }
            });
        }
      })

    }
  }


  pay() {
    this.lignesCmdClt = [];

    if (this.idProduct) {
      this.lignesCmdClt = [];
      const ligneCmd: LigneCommandeClientDto = {
        productDto: this.productDto,
        quantite: +this.quantity,
        // @ts-ignore
        prixUnitaire: this.productDto.prixUnitaireHt * (+this.quantity),
      };
      console.log(ligneCmd);
      this.lignesCmdClt.push(ligneCmd);

      this.livraisonInfo.addressDto = this.addressDto;

      const cmdClien: CommandeClientDto = {
        utilisateurDto: this.userDto,
        code: "CMD-CLT-TEST",
        ligneCommandeClients: this.lignesCmdClt,
        etatCommande: "EN_PREPARATION",
        livraisonInfoDto: this.livraisonInfo
      }

      /*
      const paiement: PaiementDto = {
        commandeClientDto: cmdClien,
        montant: this.productDto.prixUnitaireHt && this.quantity != null ? this.productDto.prixUnitaireHt * this.quantity : this.productDto.prixUnitaireHt,
        mode: "Credit Card",
        statut: "Paid",
        cardOwner : this.cardOwner,
        ccv : this.cardCCV,
        month : this.month,
        year : this.year,
        cardNumber : this.cardNo
      }
       */

      this.paiement.commandeClientDto = cmdClien;
      // @ts-ignore
      this.paiement.montant = this.productDto.prixUnitaireHt * this.quantity ;


      this.paiementService.save3({
        body: this.paiement
      }).subscribe({
        next: (result) => {
          const notification: NotificationDto = {
            title: 'New Orders',
            url: '/admin/commande-client'
          }
          this.notificationService.save4({body: notification}).subscribe({
            next: () => {
              this.productDto = {};
              this.router.navigate(['store', 'success']);
            }
          })
        },
        error: (err) => {
          err.error.errors.forEach( (e: string | undefined) =>{
            this.toastrService.error(e);
          })

        }
      });
    }

    else {
      this.lignesCmdClt = [];
      console.log(this.products);
      this.products.forEach(p => {

        let ligneCmd: LigneCommandeClientDto = {
          productDto: p,
          quantite: p.quantity,
          // @ts-ignore
          prixUnitaire: p.prixUnitaireHt * p.quantity,
        };


        console.log(ligneCmd);


        this.lignesCmdClt.push(ligneCmd);
      });
      // @ts-ignore
      this.lignesCmdClt.forEach(l => this.prix += l.prixUnitaire);
      console.log(this.prix);
      this.livraisonInfo.addressDto = this.addressDto;

      const cmdClien: CommandeClientDto = {
        utilisateurDto: this.userDto,
        code: "CMD-CLT-TEST",
        ligneCommandeClients: this.lignesCmdClt,
        etatCommande: "EN_PREPARATION",
        livraisonInfoDto: this.livraisonInfo
      }

      this.paiement.commandeClientDto = cmdClien;
      // @ts-ignore
      this.paiement.montant = this.prix;

      this.paiementService.save3({
        body: this.paiement
      }).subscribe({
        next: (result) => {
          this.cartService.deleteAll().subscribe({next : ()=>{
            this.generateNextService.cartAddedSubject.next(true);
          } });
          this.products = [];
          const notification: NotificationDto = {
            title: 'New Orders',
            url: '/admin/commande-client'
          }
          this.notificationService.save4({body: notification}).subscribe({
            next: () => {
              this.productDto = {};
              this.router.navigate(['store', 'success']);
            }
          })
        },
        error: (err) => {
          err.error.errors.forEach( (e: string | undefined) =>{
            this.toastrService.error(e);
          })
        }
      })

    }
  }

}
