import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  role: string | null = null;

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.role = parsedUser.role;
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
