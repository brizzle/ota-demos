import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
