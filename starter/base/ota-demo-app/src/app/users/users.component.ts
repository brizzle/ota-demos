import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  form: FormGroup;
  users: Array<any> = new Array<any>();
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  public ngOnInit() {}

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => {
      e.unsubscribe();
    });
  }
}
