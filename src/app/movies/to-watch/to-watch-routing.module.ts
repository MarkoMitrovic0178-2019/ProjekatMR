import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToWatchPage } from './to-watch.page';

const routes: Routes = [
  {
    path: '',
    component: ToWatchPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToWatchPageRoutingModule {}
