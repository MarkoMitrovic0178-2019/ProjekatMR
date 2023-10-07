import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectorDetailsPageRoutingModule } from './director-details-routing.module';

import { DirectorDetailsPage } from './director-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectorDetailsPageRoutingModule
  ],
  declarations: [DirectorDetailsPage]
})
export class DirectorDetailsPageModule {}
