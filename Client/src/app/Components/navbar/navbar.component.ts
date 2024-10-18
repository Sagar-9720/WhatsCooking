import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  role: string | null = null;
  user: User | null = null;
  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.role = parsedUser.role;
      this.user = parsedUser;
    } else {
      this.role = null;
    }
  }
  constructor() {
    this.reloadComponent();
  }

  reloadComponent() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.role = parsedUser.role;
    } else {
      this.role = null;
    }
  }
}
