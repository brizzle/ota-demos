import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProxyService } from '../../../services/user-proxy.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { BaseEditComponent } from '../../base-edit.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public user: User = new User();
  private subscriptions: Subscription[] = [];
  public isValid = true;
  private id: number;

  constructor(
    private userProxySvc: UserProxyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  public ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.id = +params.get('id');

        this.setTitle(this.id);

        let model;

        if (this.id) {
          this.userProxySvc.get(this.id).subscribe(data => this.createForm(data));
        } else {
          model = new User();
          this.createForm(model);
        }
      }),
    );

    this.createForm(new User());
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public cancel(): void {
    this.router.navigate(['/users/']);
  }

  public submit(): void {
    const name = this.form.get('name').value;
    const role = this.form.get('role').value;

    const data = { name, role };

    if (this.title === 'Edit') {
      this.userProxySvc.update(this.id, data).subscribe(
        () => this.handleSuccess,
        err => this.handleError(err),
      );
    } else {
      this.userProxySvc.add(data).subscribe(() => this.handleSuccess);
    }
  }

  private createForm(model): void {
    this.form = this.formBuilder.group({
      name: [model.name],
      role: [model.role],
    });
  }

  private handleSuccess(): void {
    console.log('Routing...');
    this.router.navigate(['/']);
  }

  private handleError(err): void {
    console.log('ERROR', err);
  }
}
