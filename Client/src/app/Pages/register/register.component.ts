import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserserviceService } from 'src/app/Services/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    verifyPassword: '',
    role: '',
  };

  constructor(
    private router: Router,
    private userService: UserserviceService
  ) {}

  onSubmit(registerForm: any) {
    if (registerForm.valid) {
      alert('User registered:');
      this.userService.addUser(this.user).subscribe((c) => (this.user = c));

      this.router.navigate(['/login']);
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
