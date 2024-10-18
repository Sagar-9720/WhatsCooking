import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown--;
      this.cd.detectChanges();
      this.toastr.info('Logging out in ' + this.countdown + ' seconds');
      sessionStorage.removeItem('user');
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
