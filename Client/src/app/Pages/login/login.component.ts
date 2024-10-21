import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import * as emailjs from 'emailjs-com';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();

  flag: boolean = false;
  generatedOtp: string = '';
  forgotPasswordActive = false;
  otpSent = false;
  otpVerified = false;
  currentView: string = 'login';

  constructor(
    private router: Router,
    private userService: UserserviceService,
    private toastr: ToastrService
  ) {}

  onSubmit(registerForm: any) {
    if (registerForm.valid) {
      this.userService.loginUser(this.user).subscribe(
        (response) => {
          this.user = response;
          if (this.user && this.user.role) {
            localStorage.setItem('role', this.user.role);
            this.toastr.success('Logged in successfully!');
            this.router.navigate(['/welcome']);
          }
        },
        (error) => {
          if (error.status === 401) {
            console.error('Unauthorized:', error);
            this.toastr.error('Unauthorized. Please check your credentials.');
          } else {
            console.error('Error:', error);
            this.toastr.error('An error occurred during login.');
          }
        }
      );
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  forgotPassword(): void {
    this.forgotPasswordActive = true;
    this.setView('forgotPassword');
  }

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // logic for generating a 6-digit OTP
  }

  sendOtp(forgotPasswordForm: any): void {
    if (forgotPasswordForm.valid) {
      this.generatedOtp = this.generateOtp();
      const emailParams = {
        to_email: this.user.email,
        otp: this.generatedOtp,
      };

      emailjs
        .send(
          'service_nv5lxnp',
          'template_lgelbyd',
          emailParams,
          'SjgihAB4UCeme8PYg'
        )
        .then(
          (response: { status: number; text: string }) => {
            console.log(
              'OTP sent successfully',
              response.status,
              response.text
            );
            this.toastr.success('OTP sent successfully');
            this.otpSent = true;
            this.setView('otp');
          },
          (err: any) => {
            this.toastr.error('Failed to send OTP');
            console.error('Failed to send OTP', err);
          }
        );
    }
  }

  verifyOtp(otpForm: any): void {
    if (otpForm.valid) {
      if (this.user.otp === this.generatedOtp) {
        this.otpVerified = true;
        this.toastr.success('OTP verified successfully');
        this.setView('resetPassword');
      } else {
        this.toastr.error('Invalid OTP');
        console.log('Invalid OTP');
      }
    }
  }

  resetPassword(resetPasswordForm: any): void {
    if (resetPasswordForm.valid) {
      this.userService
        .getUserDetails(this.user.username!)
        .subscribe((existingUser) => {
          existingUser.password = this.user.password;
          this.userService.changePassword(existingUser).subscribe((success) => {
            if (success) {
              this.toastr.success('Password reset successfully');
              console.log(`Password reset successfully for ${this.user.email}`);
              this.flag = true;
              this.setView('login');
            } else {
              this.toastr.error('Password reset failed');
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

  setView(view: string): void {
    this.currentView = view;
  }

  getTitle(): string {
    if (this.forgotPasswordActive && !this.otpSent && !this.otpVerified) {
      return 'Forgot Password';
    } else if (this.otpSent && !this.otpVerified) {
      return 'Verify OTP';
    } else if (this.otpVerified) {
      return 'Reset Password';
    } else {
      return 'Login';
    }
  }
}
