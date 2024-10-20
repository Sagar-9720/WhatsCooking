import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const user = sessionStorage.getItem('user');
    if (user) {
      // User is logged in, allow access
      return true;
    } else {
      // User is not logged in, redirect to login page
      return this.router.parseUrl('/login'); // Redirect to login page
    }
  }
}
