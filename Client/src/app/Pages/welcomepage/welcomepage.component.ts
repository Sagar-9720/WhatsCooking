import { Component } from '@angular/core';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.css'],
})
export class WelcomepageComponent {
  name: string | null = null;

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.name = parsedUser.firstName;
    } else {
      this.name = null;
    }
  }
}
