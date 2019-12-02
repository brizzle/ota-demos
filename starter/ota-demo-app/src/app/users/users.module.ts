import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './edit/user-edit.component';

const ROUTES: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:id/edit',
    component: UserEditComponent,
  },
];

@NgModule({
  declarations: [UsersComponent, UserEditComponent],
  exports: [UsersComponent, UserEditComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), ReactiveFormsModule],
  providers: [],
})
export class UserModule {}
