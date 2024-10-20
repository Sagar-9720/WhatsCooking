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

  // Fields to keep track of which input is editable
  isFieldEditable: { firstName: boolean; lastName: boolean; email: boolean } = {
    firstName: false,
    lastName: false,
    email: false,
  };

  otp: string = '';
  sentOtp: string = '';
  showOtpInput = false;
  isEmailVerified = false;
  otpTimeout: any;
  isPasswordEditable = false;
  showPasswordErrorButtons = false;
  passwordChangeFailed = false;
  showPassword = {
    current: false,
    new: false,
    verify: false,
  };
  constructor(
    private userService: UserserviceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUserDetailsFromSession();
  }
  // Removed duplicate togglePasswordVisibility function
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

  enableField(field: 'firstName' | 'lastName' | 'email') {
    this.isFieldEditable = {
      firstName: false,
      lastName: false,
      email: false,
    };
    this.isFieldEditable[field] = true;
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

  // Call user service to update profile
  updateUserProfile() {
    this.userService.updateProfile(this.user).subscribe(
      (updatedUser: User) => {
        this.toastr.success('Profile updated successfully!');
        console.log('Profile updated successfully:', updatedUser);
        sessionStorage.setItem('user', JSON.stringify(updatedUser)); // Update session with new details
        this.isFieldEditable = {
          firstName: false,
          lastName: false,
          email: false,
        };
      },
      (error) => {
        this.toastr.error('Error updating profile');
        console.error('Error updating profile:', error);
      }
    );
  }

  // Function to send OTP via email
  sendOtp(email: string) {
    this.sentOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const templateParams = {
      to_email: email,
      otp: this.sentOtp,
    };

    emailjs
      .send(
        'service_y2qrmep',
        'template_drot7nw',
        templateParams,
        '9Jdz3Gwg5Pv4TNysU'
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
      this.toastr.error('OTP expired. Please request a new one.');
      this.showOtpInput = false;
      this.sentOtp = '';
    }, 300000);
  }

  verifyOtp() {
    if (this.otp === this.sentOtp) {
      this.toastr.success('OTP verified successfully!');
      this.isEmailVerified = true;
      this.updateUserProfile();
      clearTimeout(this.otpTimeout);
      this.showOtpInput = false;
    } else {
      this.toastr.error('Invalid OTP. Please try again.');
    }
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
              this.router.navigate(['/login']);
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

  togglePasswordVisibility(field: 'current' | 'new' | 'verify') {
    this.showPassword[field] = !this.showPassword[field];
  }
}
