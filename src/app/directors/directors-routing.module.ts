import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorsPage } from './directors.page';

const routes: Routes = [
  {
    path: '',
    component: DirectorsPage
  },
  {
    path: ':directorId',
    loadChildren: () => import('./director-details/director-details.module').then( m => m.DirectorDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectorsPageRoutingModule {}
