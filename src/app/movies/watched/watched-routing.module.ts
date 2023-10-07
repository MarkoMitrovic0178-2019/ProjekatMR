import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchedPage } from './watched.page';


const routes: Routes = [
  {
    path: '',
    component: WatchedPage
  },

  {
    path: ':movieId',
    loadChildren: () => import('./movie-details/movie-details.module').then( (m) => m.MovieDetailsPageModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchedPageRoutingModule {}
