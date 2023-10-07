import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToWatchPageRoutingModule } from './to-watch-routing.module';

import { ToWatchPage } from './to-watch.page';
import {WatchedPageModule} from "../watched/watched.module";
import {MoviesToWatchElementComponent} from "./movies-to-watch-element/movies-to-watch-element.component";
import {MoviesToWatchModalComponent} from "../movies-to-watch-modal/movies-to-watch-modal.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ToWatchPageRoutingModule,
        WatchedPageModule,
    ],
    declarations: [ToWatchPage, MoviesToWatchElementComponent,MoviesToWatchModalComponent]
})
export class ToWatchPageModule {}
