import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  countdown: number = 3;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Clear session data and prevent back navigation
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.preventBackNavigation();

    const interval = setInterval(() => {
      this.countdown--;
      this.cd.detectChanges();
      this.toastr.info('Logging out in ' + this.countdown + ' seconds');

      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/']); // Redirect after countdown
      }
    }, 1000);
  }

  preventBackNavigation() {
    // Use history.pushState to prevent going back
    history.pushState(null, '', location.href);

    // Subscribe to location changes to handle back navigation
    this.location.subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
