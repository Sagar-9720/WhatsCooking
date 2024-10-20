import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  role: string | null = null;
  user: User | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.reloadComponent();
  }

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

  reloadComponent() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.role = parsedUser.role;
    } else {
      this.role = null;
    }
  }
  endorsedByMe() {
    this.router.navigate(['/view-all-recipe'], {
      queryParams: { endorsed: 'true' },
    });
  }
  endorsedRecipe() {
    this.router.navigate(['/view-all-recipe'], {
      queryParams: { endorsed: 'false' },
    });
  }
}
