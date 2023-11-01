import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurDto} from "../../../services/services/models/utilisateur-dto";
import {AddressDto} from "../../../services/services/models/address-dto";
import {UtilisateurService} from "../../../services/services/services/utilisateur.service";
import {PhotoService} from "../../../services/services/services/photo.service";
import {HelperService} from "../../../services/helper/helper.service";
import {AuthService} from "../../../services/services/authService/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-utilisateur',
  templateUrl: './new-utilisateur.component.html',
  styleUrls: ['./new-utilisateur.component.scss']
})
export class NewUtilisateurComponent implements OnInit {
  role = '';
  idUser = -1;
  idAdmin = -1;
  user: UtilisateurDto = {};
  address: AddressDto = {};
  file: File | null = null;
  imgUrl: string | ArrayBuffer = 'assets/inconnu.png';
  pass = false;

  constructor(
    private router: Router,
    private userService: UtilisateurService,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private helper: HelperService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.params['idUser'];
    this.authService.getUserId().subscribe({
      next: (id) => {
        this.idAdmin = id;
      }
    })
    if (this.idUser) {
      this.pass = true
      this.userService.findById1({
        idUtilisateur: this.idUser
      }).subscribe({
        next: (user) => {
          this.user = user
          if (user.address) {
            this.address = user.address
          }
          if (user.photo) {
            this.imgUrl = user.photo
          }
        }
      })
    }
    this.authService.getRole().subscribe({
      next: (data) => {
        this.role = data;
      }
    })

  }

  cancelClick() {
    if (this.role === 'store') {
      this.router.navigate([this.role, 'profil'])
    } else if (this.idUser == this.idAdmin) {
      this.router.navigate(['admin', 'profil'])
    } else {
      this.router.navigate(['admin', 'utilisateurs'])
    }
  }


savePhoto(idObject
:
number | undefined, titre
:
string | undefined
)
{
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
        if (this.role === 'store') {
          this.router.navigate([this.role, 'profil'])
        } else {
          if (this.idUser) {
            this.router.navigate(['admin', 'profil'])
          } else {
            this.router.navigate(['admin', 'utilisateurs'])
          }
        }
      },
      error: err => {
        err.error.errors.forEach((e: string | undefined) => {
          this.toastrService.error(e);
        })
      }
    })
  } else {
    if (this.role === 'store') {
      this.router.navigate([this.role, 'profil'])
    } else {
      if (this.idUser == this.helper.userId) {
        this.router.navigate(['admin', 'profil'])
      } else {
        this.router.navigate(['admin', 'utilisateurs'])
      }
    }
  }
}

onFileInput(files
:
FileList | null
)
{
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

saveUser()
{
  this.user.address = this.address
  this.userService.save1({
    body: this.user
  }).subscribe({
    next: (user) => {
      this.savePhoto(user.id, user.prenom)
    },
    error: (err) => {
      err.error.errors.forEach((e: string | undefined) => {
        this.toastrService.error(e);
      })
    }
  })
}
}
