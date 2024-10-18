import { Component } from '@angular/core';
import { Router } from '@angular/router';
import emailjs from 'emailjs-com';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Models/User';

import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = new User();

  allUser: User[] = [];
  isUsernameTaken: boolean = false;
  isEmailTaken: boolean = false;
  otp: string = '';
  sentOtp: string = '';
  showOtpInput = false;
  isEmailVerified = false;
  otpTimeout: any;

  constructor(
    private router: Router,
    private userService: UserserviceService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.allUser = data;
    });
  }

  checkUsernameExistence() {
    this.isUsernameTaken =
      this.allUser.filter((u: User) => u.username === this.user.username)
        .length > 0;
  }

  checkEmailExistence() {
    this.isEmailTaken =
      this.allUser.filter((u: User) => u.email === this.user.email).length > 0;
  }

  onSubmit(registerForm: any) {
    if (registerForm.valid) {
      this.userService.addUser(this.user).subscribe(
        (response: any) => {
          if (response === 'Successfully registered') {
            this.user = new User(); // Reset the form
            console.log('Registration successful!');
            this.toastr.success('Registration successful!');
          } else {
            this.toastr.error('Error registering the user.');
            console.log('Error registering the user.');
          }
        },
        (error: any) => {
          console.error('Error:', error);
          this.toastr.error('An error occurred during registration.');
          console.log('An error occurred during registration.');
        }
      );
      this.router.navigate(['/login']);
    }
  }

  sendOtp(email: string) {
    this.sentOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const templateParams = {
      to_email: email,
      otp: this.sentOtp,
    };

    emailjs
      .send(
        'service_nv5lxnp',
        'template_lgelbyd',
        templateParams,
        'SjgihAB4UCeme8PYg'
      )
      .then(() => {
        this.toastr.success('OTP sent successfully!');
        this.showOtpInput = true;
        this.startOtpTimer();
      })
      .catch((err) => {
        this.toastr.error('Error sending OTP');
        console.error('Error sending OTP:', err);
      });
  }

  startOtpTimer() {
    // Clear any existing timers
    clearTimeout(this.otpTimeout);

    // Set a 2-minute timeout
    this.otpTimeout = setTimeout(() => {
      this.toastr.error('OTP expired. Please verify your email again.');
      console.log('OTP expired. Please verify your email again.');
      this.showOtpInput = false;
      this.user.email = ''; // Reset the email field
      this.isEmailVerified = false;
    }, 2 * 60 * 1000); // 2 minutes
  }

  verifyOtp() {
    if (this.otp === this.sentOtp) {
      clearTimeout(this.otpTimeout);
      this.isEmailVerified = true;
      this.toastr.success('Email verified successfully!');
      console.log('Email verified successfully!');
      this.showOtpInput = false;
    } else {
      this.toastr.error('Invalid OTP. Please try again.');
      console.log('Invalid OTP. Please try again.');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
