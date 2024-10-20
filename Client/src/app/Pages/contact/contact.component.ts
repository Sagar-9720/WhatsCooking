import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  submitted: boolean = false;

  constructor(private toastr: ToastrService) {}

  onSubmit() {
    const templateParams = {
      from_name: this.name,
      from_email: this.email,
      message: this.message,
    };

    emailjs
      .send(
        'service_owox3uq',
        'template_20wtljg',
        templateParams,
        'EYFdrAyHUNhZKyZjg'
      )
      .then(
        () => {
          this.toastr.success('Email sent successfully!');
          this.name = '';
          this.email = '';
          this.message = '';
          this.submitted = true;
        },
        () => {
          this.toastr.error('Error sending email');
        }
      );
  }
}
