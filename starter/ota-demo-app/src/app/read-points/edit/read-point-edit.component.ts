import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReadPointProxyService } from '../../../services/read-point-proxy.service';
import { ReadPoint } from '../readPoint';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEditComponent } from '../../base-edit.component';

@Component({
  selector: 'app-read-point-edit',
  templateUrl: './read-point-edit.component.html',
  styleUrls: ['./read-point-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReadPointEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public readPoint: ReadPoint = new ReadPoint();
  private subscriptions: Subscription[] = [];
  public isValid = true;

  constructor(
    private readPointProxySvc: ReadPointProxyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  public ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const id = +params.get('id');

        this.setTitle(id);

        let model;

        if (id) {
          this.readPointProxySvc.get(id).subscribe(data => this.createForm(data));
        } else {
          model = new ReadPoint();
          this.createForm(model);
        }
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
    const title = this.form.get('title').value;
    const description = this.form.get('description').value;
    const type = this.form.get('type').value;
    const latitude = +this.form.get('latitude').value;
    const longitude = +this.form.get('longitude').value;

    const data = { title, description, type, coordinates: [longitude, latitude] };

    if (this.title === 'Edit') {
      this.readPointProxySvc.update(data).subscribe(() => this.handleSuccess);
    } else {
      this.readPointProxySvc.add(data).subscribe(() => this.handleSuccess);
    }
  }

  private createForm(model): void {
    const lat = model.coordinates ? model.coordinates[1] : null;
    const lng = model.coordinates ? model.coordinates[0] : null;

    // model.title = 'Kellyville';
    // model.description = 'US 33, 66 Kellyville Ramps';
    // model.type = 'Point';
    // lat = 35.99;
    // lng = -96.19;

    this.form = this.formBuilder.group({
      title: [model.title],
      description: [model.description],
      type: [model.type],
      latitude: [lat],
      longitude: [lng],
    });
  }

  private handleSuccess(): void {
    this.router.navigate(['/']);
  }
}
