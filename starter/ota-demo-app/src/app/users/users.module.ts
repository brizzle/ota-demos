import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ROUTES: Routes = [
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
  providers: []
})
export class UserModule {}
