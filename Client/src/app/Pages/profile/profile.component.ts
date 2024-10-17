import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserserviceService } from 'src/app/Services/userservice.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: User =new User();

  passwordDetails = {
    currentPassword: '',
    newPassword: '',
    verifyNewPassword: '',
  };

  constructor(private userService: UserserviceService) {}

  fetchUserDetails() {
    if (this.user.username) {
      this.userService.getUserDetails(this.user.username).subscribe(
        (data: any) => {
          this.user = data;
          console.log('User details fetched:', data);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('Please enter a username to fetch details.');
    }
  }

  onSubmit(profileForm: NgForm) {
    if (profileForm.valid) {
      this.userService.updateProfile(this.user).subscribe(
        (updatedUser: User) => {
          console.log('Profile updated successfully:', updatedUser);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  onChangePassword(changePasswordForm: NgForm) {
    if (changePasswordForm.valid) {
      if (
        this.passwordDetails.newPassword ===
        this.passwordDetails.verifyNewPassword
      ) {
        this.userService
          .changePassword(this.user)
          .subscribe(
            (success: boolean) => {
              if (success) {
                console.log('Password changed successfully');
              } else {
                console.error('Error changing password');
              }
            },
            (error) => {
              console.error('Error changing password:', error);
            }
          );
      } else {
        console.log('Passwords do not match');
      }
    }
  }
}
