import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: MoviesPage,
    children: [
      {
        path: 'watched',
        loadChildren: () => import('./watched/watched.module').then(m => m.WatchedPageModule)
      },
      {
        path: 'to-watch',
        loadChildren: () => import('./to-watch/to-watch.module').then(m => m.ToWatchPageModule)
      },
      {
        path: '',
        redirectTo: '/movies/tabs/watched',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    redirectTo: '/movies/tabs/watched',
    pathMatch: 'full'
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
