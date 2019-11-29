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
    const title = this.form.get('title').value;
    const description = this.form.get('description').value;
    const type = this.form.get('type').value;
    const latitude = +this.form.get('latitude').value;
    const longitude = +this.form.get('longitude').value;

    const data = { title, description, type, coordinates: [longitude, latitude] };

    console.log(data);

    this.readPointProxySvc.add(data).subscribe(() => this.router.navigate(['/']));
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
}
