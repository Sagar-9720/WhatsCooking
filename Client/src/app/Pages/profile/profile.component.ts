import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { UserserviceService } from 'src/app/Services/userservice.service';
import emailjs from 'emailjs-com';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: User = new User();
  prevUser: User = new User();
  originalEmail: string = '';

  currentSection: string = 'userDetails';
  isUserDetailsEditable = false;

  otp: string = '';
  sentOtp: string = '';
  showOtpInput = false;
  isEmailVerified = false;
  otpTimeout: any;
  isPasswordEditable = false;
  showPasswordErrorButtons = false;
  passwordChangeFailed = false;

  constructor(
    private userService: UserserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUserDetailsFromSession();
  }

  loadUserDetailsFromSession(): void {
    const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (storedUser) {
      this.user = storedUser;
      this.originalEmail = storedUser.email;
      this.prevUser.userId = storedUser.userId;
      this.prevUser.username = storedUser.username;
    } else {
      console.error('No user data found in session storage.');
    }
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  enableUserDetails() {
    this.isUserDetailsEditable = true;
  }

  enablePasswordChange() {
    this.isPasswordEditable = true;
  }

  onChangePassword(form: NgForm) {
    if (form.valid) {
      this.userService.loginUser(this.prevUser).subscribe(
        (response) => {
          this.userService.changePassword(this.user).subscribe(
            (response) => {
              this.toastr.success('Password changed successfully!');
              console.log('Password changed successfully');
              this.isPasswordEditable = false;
              this.passwordChangeFailed = false;
            },
            (error) => {
              this.toastr.error('Error changing password');
              console.error('Error changing password:', error);
              this.passwordChangeFailed = true;
            }
          );
        },
        (error) => {
          this.toastr.error('Incorrect Current Password!');
          console.log('Incorrect Current Password!');
          this.showPasswordErrorButtons = true;
          this.passwordChangeFailed = true;
        }
      );
    }
  }

  resetPasswordFields() {
    this.prevUser.password = '';
    this.user.password = '';
    this.user.verifyPassword = '';
    this.showPasswordErrorButtons = false;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onUpdateProfile(form: NgForm) {
    if (form.valid) {
      if (this.user.email && this.user.email !== this.originalEmail) {
        this.sendOtp(this.user.email);
      } else {
        this.updateUserProfile();
      }
    }
  }

  updateUserProfile() {
    this.userService.updateProfile(this.user).subscribe(
      (updatedUser: User) => {
        this.toastr.success('Profile updated successfully!');
        console.log('Profile updated successfully:', updatedUser);
        this.isUserDetailsEditable = false;
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
      },
      (error) => {
        this.toastr.error('Error updating profile');
        console.error('Error updating profile:', error);
      }
    );
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
        this.toastr.success('OTP sent successfully');
        this.showOtpInput = true;
        this.startOtpTimer();
      })
      .catch((err) => this.toastr.error('Error sending OTP'));
  }

  startOtpTimer() {
    clearTimeout(this.otpTimeout);

    this.otpTimeout = setTimeout(() => {
      this.toastr.error('OTP expired. Please verify your email again.');
      console.log('OTP expired. Please verify your email again.');
      this.showOtpInput = false;
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
      this.updateUserProfile();
    } else {
      this.toastr.error('Invalid OTP. Please try again.');
      console.log('Invalid OTP. Please try again.');
    }
  }
}
