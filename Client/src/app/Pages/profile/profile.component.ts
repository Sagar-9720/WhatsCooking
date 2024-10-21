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
  isFieldEditable = { firstName: false, lastName: false, email: false };
  otp: string = '';
  sentOtp: string = '';
  showOtpInput = false;
  isEmailVerified = false;
  otpTimeout: any;
  isPasswordEditable = false;
  showPasswordErrorButtons = false;
  passwordChangeFailed = false;
  showPassword = { current: false, new: false, verify: false };

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
      this.prevUser = {
        userId: storedUser.userId,
        username: storedUser.username,
        role: storedUser.role,
      };
    } else {
      console.error('No user data found in session storage.');
    }
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  enableField(field: keyof typeof this.isFieldEditable) {
    Object.keys(this.isFieldEditable).forEach(
      (key) =>
        (this.isFieldEditable[key as keyof typeof this.isFieldEditable] = false)
    );
    this.isFieldEditable[field] = true;
  }

  async onUpdateProfile(form: NgForm) {
    if (form.valid) {
      if (this.user.email && this.user.email !== this.originalEmail) {
        await this.sendOtp(this.user.email);
      } else {
        await this.updateUserProfile();
      }
    }
  }

  async updateUserProfile() {
    try {
      const updatedUser = await this.userService
        .updateProfile(this.user)
        .toPromise();
      this.toastr.success('Profile updated successfully!');
      console.log('Profile updated:', updatedUser);
      this.resetEditableFields();
    } catch (error) {
      this.toastr.error('Error updating profile');
      console.error('Error updating profile:', error);
    }
  }

  async sendOtp(email: string) {
    this.sentOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const templateParams = { to_email: email, otp: this.sentOtp };

    try {
      await emailjs.send(
        'service_y2qrmep',
        'template_drot7nw',
        templateParams,
        '9Jdz3Gwg5Pv4TNysU'
      );
      this.toastr.success('OTP sent successfully');
      this.showOtpInput = true;
      this.startOtpTimer();
    } catch {
      this.toastr.error('Error sending OTP');
    }
  }

  startOtpTimer() {
    clearTimeout(this.otpTimeout);
    this.otpTimeout = setTimeout(() => {
      this.toastr.error('OTP expired. Please request a new one.');
      this.showOtpInput = false;
      this.sentOtp = '';
    }, 300000);
  }

  async verifyOtp() {
    if (this.otp === this.sentOtp) {
      this.toastr.success('OTP verified successfully!');
      this.isEmailVerified = true;
      await this.updateUserProfile();
      clearTimeout(this.otpTimeout);
      this.showOtpInput = false;
    } else {
      this.toastr.error('Invalid OTP. Please try again.');
    }
  }

  async onChangePassword(form: NgForm) {
    if (form.valid) {
      try {
        await this.userService.loginUser(this.prevUser).toPromise();
        const response = await this.userService
          .changePassword(this.user)
          .toPromise();
        this.toastr.success('Password changed successfully!');
        console.log('Password changed:', response);

        this.resetPasswordFields();
      } catch (error) {
        this.handlePasswordChangeError(error);
      }
    }
  }

  resetPasswordFields() {
    this.prevUser.password = '';
    this.user.password = '';
    this.user.verifyPassword = '';
    this.showPasswordErrorButtons = false;
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'verify') {
    this.showPassword[field] = !this.showPassword[field];
  }

  forgotPassword() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private resetEditableFields() {
    this.isFieldEditable = { firstName: false, lastName: false, email: false };
  }

  private handlePasswordChangeError(error: any) {
    if (error.status === 401) {
      this.toastr.error('Incorrect Current Password!');
      this.showPasswordErrorButtons = true;
      this.passwordChangeFailed = true;
    } else {
      this.toastr.error('Error changing password');
      console.error('Error changing password:', error);
      this.passwordChangeFailed = true;
    }
  }
}
