import { Component, OnInit } from '@angular/core';
import {directors} from "../directors.page";
import {ActivatedRoute} from "@angular/router";
import {DirectorModel} from "../director.model";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.page.html',
  styleUrls: ['./director-details.page.scss'],
})
export class DirectorDetailsPage implements OnInit {


  director:DirectorModel;
  isLoading=false;
  constructor(private route: ActivatedRoute, private navCtrl:NavController) {}

  ngOnInit() {
    // Retrieve director ID from route parameters
    this.route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('directorId')) {
          this.navCtrl.navigateBack('/directors');
          return;
        }

        const directorId = paramMap.get('directorId');
        if (directorId !== null) {
          this.isLoading = true;
          this.director = directors.find((d) => d.id === directorId)!;
          if (this.director === undefined) {
            throw new Error(`Director with id ${directorId} not found.`);
          }
          this.isLoading=false;
  }

});
  }
}
