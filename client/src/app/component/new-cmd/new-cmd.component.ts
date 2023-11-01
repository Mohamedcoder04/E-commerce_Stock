import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientDto} from "../../services/services/models/client-dto";
import {ClientService} from "../../services/services/services/client.service";
import {FournisseurService} from "../../services/services/services/fournisseur.service";
import {LigneCommandeClientDto} from "../../services/services/models/ligne-commande-client-dto";
import {CommandeClientService} from "../../services/services/services/commande-client.service";
import {CommandeFournisseurService} from "../../services/services/services/commande-fournisseur.service";
import {CommandeClientDto} from "../../services/services/models/commande-client-dto";
import {CommandeFournisseurDto} from "../../services/services/models/commande-fournisseur-dto";
import {ProductDto} from "../../services/services/models/product-dto";
import {ProductService} from "../../services/services/services/product.service";
import {UtilisateurDto} from "../../services/services/models/utilisateur-dto";
import {UtilisateurService} from "../../services/services/services/utilisateur.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-cmd',
  templateUrl: './new-cmd.component.html',
  styleUrls: ['./new-cmd.component.scss']
})
export class NewCmdComponent implements OnInit {

  origin = '';
  cltFrs: any = {};
  listCltFrs: Array<UtilisateurDto> = [];
  searchedProduct: ProductDto = {};
  codeProduct: string = '';
  quantite: number = 0;
  total: number = 0;
  listLigneCommande: Array<any> = [];
  listArticles: ProductDto[] = [];
  productNotSelected: boolean = false;
  errorMsg: Array<string> = [];
  codeCommande: string = '';


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UtilisateurService,
    private fournisseurService: FournisseurService,
    private productService: ProductService,
    private router: Router,
    private commandeClientService: CommandeClientService,
    private commandeFournisseurService: CommandeFournisseurService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.origin = data['origin'];
      }
    })
    this.findAll();
    this.findAllArticles();
    if (this.codeProduct.length === 0) {
      this.productNotSelected = false;
    }
  }

  findAllArticles() {
    this.productService.findAll2().subscribe({
      next: (data) => {
        this.listArticles = data;
      }
    })
  }

  findAll() {
    if (this.origin === 'client') {
      this.userService.findAll1({ role : 'ROLE_CLIENT' }).subscribe({
        next: (data) => {
          this.listCltFrs = data;
        },
        error: (err) => {

        }
      })
    } else if (this.origin === 'fournisseur') {
      this.fournisseurService.findAll4().subscribe({
        next: (data) => {
          this.listCltFrs = data;
        },
        error: (err) => {

        }
      })
    }
  }

  findArticleBycode(codeProduit: string) {
    if (codeProduit) {
      this.productService.findByCodeArticle({
        codeArticle: codeProduit
      }).subscribe({
        next: (article) => {
          this.searchedProduct = article
          console.log(this.searchedProduct);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  };

  chercheArticle() {
    if (this.codeProduct.length === 0) {
      this.findAllArticles();
      this.productNotSelected = false;
    }
    this.listArticles = this.listArticles.filter(
      art => art.codeProduit?.includes(this.codeProduct) || art.designation?.includes(this.codeProduct)
    )
  }

  addLigneCommande() {
    this.errorMsg = [];
    if (!this.quantite || !this.codeProduct) {
      this.errorMsg.push('les champs de ligne de commande est obligatoire');
      return;
    }

    const isAlreadyExist = this.listLigneCommande.find(
      ligne => ligne.article?.codeArticle === this.searchedProduct.codeProduit
    );
    if (isAlreadyExist) {
      this.listLigneCommande.forEach(ligne => {
        if (ligne && ligne.article?.codeArticle === this.searchedProduct.codeProduit) {
          if (ligne.quantite)
            ligne.quantite = +this.quantite + +ligne.quantite;
        }
      })
    } else {

      const ligneCommande: LigneCommandeClientDto = {
        productDto: this.searchedProduct,
        quantite: this.quantite,
        // @ts-ignore
        prixUnitaire: this.searchedProduct.prixUnitaireHt * this.quantite,
      };
      this.listLigneCommande.push(ligneCommande);
    }

    this.total = 0;
    this.listLigneCommande.forEach(ligne => {
      if (ligne.prixUnitaire && ligne.quantite)
        this.total += ligne.prixUnitaire
    })

    this.searchedProduct = {};
    this.quantite = 0;
    this.codeProduct = '';
    this.productNotSelected = false;
    this.findAllArticles();
  }

  selectCodeArticle(a: ProductDto) {
    this.searchedProduct = a;
    if (a.codeProduit) {
      this.codeProduct = a.codeProduit;
    }
    this.productNotSelected = true
  }

  saveCommande() {
    this.errorMsg = [];
    const commande = this.creerCommande();
    if (this.origin === 'client') {
      this.commandeClientService.save7({
        body: commande as CommandeClientDto
      }).subscribe({
        next: (data) => {
          this.router.navigate(['admin', 'commande-client'])
        },
        error: (err) => {
          err.error.errors.forEach( (e: string | undefined) =>{
            this.toastrService.error( e );
          })
        }
      });
    }
    else if (this.origin === 'fournisseur') {
      this.commandeFournisseurService.save6({
        body: commande as CommandeFournisseurDto
      }).subscribe({
        next: (data) => {
          this.router.navigate(['admin', 'commande-fournisseur'])
        },
        error: (err) => {
          err.error.errors.forEach( (e: string | undefined) =>{
            this.toastrService.error( e );
          })
        }
      });
    }

  }

  private creerCommande(): any {

    if (this.origin === 'client') {
      return {
        utilisateurDto: this.cltFrs,
        etatCommande: "EN_PREPARATION",
        code: this.codeCommande,
        ligneCommandeClients: this.listLigneCommande,
        livraisonInfoDto : {
          addressDto : {
            city : 'fes',
            country: 'maroc',
            houseNumber: 123,
            street: 'rue far',
            zipCode: 1273876
          },
          telephone : "06565656565",
          prenom : this.cltFrs.prenom,
          nom : this.cltFrs.nom
        }
      }
    } else if (this.origin === 'fournisseur') {
      return {
        fournisseur: this.cltFrs,
        etatCommande: "EN_PREPARATION",
        code: this.codeCommande,
        ligneCommandeFournisseurs: this.listLigneCommande,

      }
    }
  }

  annulerCmd() {
    if (this.origin === 'client') {
      this.router.navigate(['admin' , 'commande-client'])
    }
    else if (this.origin === 'fournisseur') {
      this.router.navigate(['admin' , 'commande-fournisseur'])
    }

  }
}


