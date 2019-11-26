import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProxyService } from '../../services/user-proxy.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: Array<any> = new Array<any>();
  private subscriptions: Subscription[] = [];

  constructor(private userProxySvc: UserProxyService) {}

  public ngOnInit() {
    this.userProxySvc.getAll().subscribe(
      data => (this.users = data),
      err => console.log(err)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => {
      e.unsubscribe();
    });
  }
}
