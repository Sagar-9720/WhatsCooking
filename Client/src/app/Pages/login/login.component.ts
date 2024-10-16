import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import * as emailjs from 'emailjs-com';
import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: any = {
    username: '',
    firstName: '',
    lastName: '',
    role: '',
    password: '',
    otp: '',
    newPassword: '',
    email: '',
  };

  flag: boolean = false;
  generatedOtp: string = '';
  forgotPasswordActive = false;
  otpSent = false;
  otpVerified = false;

  constructor(
    private router: Router,
    private userService: UserserviceService
  ) {}

  onSubmit(registerForm: any) {
    if (registerForm.valid) {
      this.userService.addUser(this.user).subscribe((c) => (this.user = c));
      alert('User logged in Successfully');
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  forgotPassword(): void {
    this.forgotPasswordActive = true;
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // logic for genrating a 6-digit OTP
  }

  sendOtp(forgotPasswordForm: any): void {
    if (forgotPasswordForm.valid) {
      this.generatedOtp = this.generateOtp();
      const emailParams = {
        to_email: this.user.email,
        otp: this.generatedOtp,
      };

      // emailjs
      //   .send(
      //     'service_nv5lxnp',
      //     'template_lgelbyd',
      //     emailParams,
      //     'SjgihAB4UCeme8PYg'
      //   )
      //   .then(
      //     (response: { status: number; text: string }) => {
      //       console.log(
      //         'OTP sent successfully',
      //         response.status,
      //         response.text
      //       );
      //       this.otpSent = true;
      //     },
      //     (err: any) => {
      //       console.error('Failed to send OTP', err);
      //     }
      //   );
    }
  }

  verifyOtp(otpForm: any): void {
    if (otpForm.valid) {
      if (this.user.otp === this.generatedOtp) {
        this.otpVerified = true;
      } else {
        console.log('Invalid OTP');
      }
    }
  }

  resetPassword(resetPasswordForm: any): void {
    if (resetPasswordForm.valid) {
      this.userService
        .getUserDetails(this.user.username)
        .subscribe((existingUser) => {
          existingUser.password = this.user.newPassword;
          this.userService
            .changePassword(existingUser, this.user.newPassword)
            .subscribe((success) => {
              if (success) {
                console.log(
                  `Password reset successfully for ${this.user.email}`
                );
                this.flag = true;
              } else {
                console.error('Password reset failed.');
                this.flag = false;
              }
            });
        });

      this.forgotPasswordActive = false;
      this.otpSent = false;
      this.otpVerified = false;
    }
  }
}
