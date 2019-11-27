import { NgModule } from '@angular/core';
import { ReadPointsComponent } from './read-points.component';
import { ReadPointEditComponent } from './edit/read-point-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ROUTES: Routes = [
  {
    path: 'read-points',
    component: ReadPointsComponent,
  },
  {
    path: 'read-points/:id/edit',
    component: ReadPointEditComponent,
  },
];

@NgModule({
  declarations: [ReadPointsComponent, ReadPointEditComponent],
  exports: [ReadPointsComponent, ReadPointEditComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
  providers: [],
})
export class ReadPointModule {}
