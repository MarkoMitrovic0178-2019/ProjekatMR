import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchedPageRoutingModule } from './watched-routing.module';

import { WatchedPage } from './watched.page';
import {MovieElementComponent} from "../movie-element/movie-element.component";
import {MovieModalComponent} from "../movie-modal/movie-modal.component";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WatchedPageRoutingModule
    ],
    declarations: [WatchedPage, MovieElementComponent, MovieModalComponent],

    exports: [
        MovieElementComponent
    ]
})
export class WatchedPageModule {}
