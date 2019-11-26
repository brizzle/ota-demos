import { NgModule } from '@angular/core';
import { ReadPointsComponent } from './read-points.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ROUTES: Routes = [
  {
    path: 'read-points',
    component: ReadPointsComponent
  }
];

@NgModule({
  declarations: [ReadPointsComponent],
  exports: [ReadPointsComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
  providers: []
})
export class ReadPointModule {}
