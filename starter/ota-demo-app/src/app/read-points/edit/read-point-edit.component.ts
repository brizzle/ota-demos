import { Component, OnInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReadPointProxyService } from '../../../services/read-point-proxy.service';
import { ReadPoint } from '../readPoint';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-read-point-edit',
  templateUrl: './read-point-edit.component.html',
  styleUrls: ['./read-point-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReadPointEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public readPoint: ReadPoint = new ReadPoint();
  private subscriptions: Subscription[] = [];
  public isValid = true;

  constructor(
    private readPointProxySvc: ReadPointProxyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const id = +params.get('id');
        console.log('ID: ', id);

        const model = new ReadPoint();

        this.createForm(model);
      }),
    );

    this.createForm(new ReadPoint());
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public cancel(): void {
    this.router.navigate(['/read-points/']);
  }

  public submit(): void {
    this.router.navigate(['/read-points/']);
  }

  private createForm(model): void {
    this.form = this.formBuilder.group({
      title: [model.title],
      description: [model.description],
      type: [model.type],
      coordinates: [model.coordinates],
    });
  }
}
