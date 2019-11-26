import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ota-demo-app';

  public constructor(public router: Router) {}

  public handleUsersClick(): void {
    this.router.navigate(['/users']);
  }

  public handleReadPointsClick(): void {
    this.router.navigate(['/read-points']);
  }
}
