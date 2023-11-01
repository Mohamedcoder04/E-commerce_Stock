import { Component, OnInit } from '@angular/core';
import emailjs from "@emailjs/browser";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  message : string = '';
  name : string = '';
  email : string = '';
  constructor(
    private router : Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
  }

  send() {
    emailjs.init('oDxP5NctHm0QaOzih');
    emailjs.send("service_5tf170i","template_stjpcs3",{
      from_name: this.name,
      to_name: "Jad-Shop",
      from_email: this.email,
      message: this.message,
    });
    this.toastr.success('Thank you for your message! We will get back to you shortly."');
    this.router.navigate(['store']);
  }
}
