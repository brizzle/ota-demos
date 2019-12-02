import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProxyService } from '../../services/user-proxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: Array<any> = new Array<any>();
  private subscriptions: Subscription[] = [];

  constructor(private userProxySvc: UserProxyService, public router: Router) {}

  public ngOnInit() {
    this.subscriptions.push(
      this.userProxySvc.getAll().subscribe(
        data => (this.users = data),
        err => console.log(err),
      ),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => {
      e.unsubscribe();
    });
  }

  public add(): void {
    this.router.navigate(['/users/', 0, 'edit']);
  }

  public edit(id): void {
    const userId = +id;

    if (userId) {
      this.router.navigate(['/users/', userId, 'edit']);
    } else {
      this.router.navigate(['/users/', 0, 'edit']);
    }
  }
}
