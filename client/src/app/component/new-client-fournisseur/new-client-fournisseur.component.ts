import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../services/services/services/client.service";
import {FournisseurService} from "../../services/services/services/fournisseur.service";
import {AddressDto, ClientDto, FournisseurDto, UtilisateurDto} from "../../services/services/models";
import {PhotoService} from "../../services/services/services/photo.service";
import {UtilisateurService} from "../../services/services/services/utilisateur.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-client-fournisseur',
  templateUrl: './new-client-fournisseur.component.html',
  styleUrls: ['./new-client-fournisseur.component.scss']
})
export class NewClientFournisseurComponent implements OnInit {

  origin = '';
  imgUrl: string | ArrayBuffer = 'assets/inconnu.png';
  cltFrs: any = {};
  addressDto: AddressDto = {};
  errorMsg: Array<string> = []
  file: File | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private utilisateurService: UtilisateurService,
    private fournisseurService: FournisseurService,
    private photoService: PhotoService,
    private toastr : ToastrService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.origin = data['origin'];
      }
    });
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      if (this.origin === 'client') {
        this.utilisateurService.findById1({
          idUtilisateur: id
        }).subscribe({
          next: (data) => {
            this.cltFrs = data;
            this.addressDto = data.address as AddressDto
            if (this.cltFrs.photo) {
              this.imgUrl = this.cltFrs.photo
            }
          },
          error: (err) => {
            err.error.errors.forEach( (e: string | undefined) =>{
              this.toastr.error( e );
            })
          }
        })
      } else if (this.origin === 'fournisseur') {
        this.fournisseurService.findById4({
          idFournisseur: id
        }).subscribe({
          next: (data) => {
            this.cltFrs = data;
            this.addressDto = data.address as AddressDto
            if (this.cltFrs.photo) {
              this.imgUrl = this.cltFrs.photo
            }
          }
        })
      }
    }
  }

  saveCltFrs(): void {
    if (this.origin === 'client') {
      this.utilisateurService.save1({
        body: this.toClient()
      }).subscribe({
        next: (data) => {
          this.savePhoto(data.id, data.nom)
        },
        error: (err) => {
          err.error.errors.forEach( (e: string | undefined) =>{
            this.toastr.error( e );
          })
        }
      });
    } else if (this.origin === 'fournisseur') {
      this.fournisseurService.save5({
        body: this.toFournisseur()
      }).subscribe({
        next: (data) => {
          this.savePhoto(data.id, data.nom)
        },
        error: (err) => {
          err.error.errors.forEach( (e: string | undefined) =>{
            this.toastr.error( e );
          })
        }
      });
    }
  }

  toClient(): UtilisateurDto {
    const clientDto: UtilisateurDto = {
      id: this.cltFrs.id,
      prenom: this.cltFrs.prenom,
      nom: this.cltFrs.nom,
      email: this.cltFrs.email,
      telephone: this.cltFrs.telephone,
      address: this.addressDto,
      password : this.cltFrs.password,
      role : this.cltFrs.role
    }
    return clientDto;
  }

  toFournisseur(): FournisseurDto {
    const fournisseurDto: FournisseurDto = {
      id: this.cltFrs.id,
      prenom: this.cltFrs.prenom,
      nom: this.cltFrs.nom,
      email: this.cltFrs.email,
      telephone: this.cltFrs.telephone,
      address: this.addressDto
    }
    return fournisseurDto;
  }


  cancelClick(): void {
    if (this.origin === 'client') {
      this.router.navigate(['admin', 'clients']);
    } else if (this.origin === 'fournisseur') {
      this.router.navigate(['admin', 'fournisseurs']);
    }
  }

  onFileInput(files: FileList | null) {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result
          }
        }
      }
    }
  }

  savePhoto(idObject: number | undefined, titre: string | undefined) {
    if (idObject && titre && this.file) {
      const params: any = {
        id: idObject,
        body: {
          file: this.file
        },
        title: titre,
        context: 'utilisateur'
      };
      this.photoService.savePhoto(params).subscribe({
        next: (data) => {
          this.router.navigate(['admin', this.origin + 's']);
        },
        error: err => {
          console.log(err);
        }
      })
    } else {
      this.router.navigate(['admin', this.origin + 's']);
    }
  }
}
