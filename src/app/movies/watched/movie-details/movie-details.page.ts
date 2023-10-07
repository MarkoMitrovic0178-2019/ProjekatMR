import { Component, OnInit } from '@angular/core';
import {Movie} from "../../movies.model";
import {MoviesService} from "../../movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, LoadingController, ModalController, NavController} from "@ionic/angular";

import {AuthService} from "../../../auth/auth.service";
import {MovieModalComponent} from "../../movie-modal/movie-modal.component";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie:Movie;
  isLoading=false;


  constructor(private route: ActivatedRoute, private moviesService:MoviesService,
              private navCtrl:NavController,
              private loadingCtrl:LoadingController,
              private modalCtrl:ModalController,
              private authService:AuthService,
              private alertCtrl:AlertController

  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('movieId')) {
          this.navCtrl.navigateBack('/movies/tabs/watched');
          return;
        }

        const movieId = paramMap.get('movieId');
        if (movieId !== null) {
          this.isLoading = true;

          this.moviesService
            .getMovie(movieId)
            .subscribe((movie) => {
              this.movie = movie;
              this.isLoading = false;
            });
        }
      }
    );
  }

  async onDeleteMovie(){
    const deleteAlert = await this.alertCtrl.create(
      {
        header: '',
        message: 'Do you want to delete this movie',
        buttons: [{text:'Yes',role:'Yes'},{text:'No',role:'No'}]
      }

    );
    await deleteAlert.present();
    deleteAlert.onDidDismiss().then((async(deleteData) => {
      const deleteButton = deleteData.role;
      if(deleteButton==='Yes'){
    const loading = await this.loadingCtrl.create({message: 'Deleting...'});
    await loading.present();

    this.moviesService.deleteMovie(this.movie.id).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/movies/tabs/watched');
    });
      }}));
  }

  async onEditMovie() {
    const modal = await this.modalCtrl.create({
      component: MovieModalComponent,
      componentProps: {title: 'Edit movie', director: this.movie.director, name: this.movie.name,imageUrl:this.movie.imageUrl,critique:this.movie.critique}
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.moviesService
        .editMovie(
          this.movie.id,
          data.movieData.director,
          data.movieData.name,
          data.movieData.imageUrl,
          data.movieData.critique,
          this.movie.userId)
        .subscribe((res) => {
          this.movie.name = data.movieData.name;
          this.movie.director = data.movieData.director;
          this.movie.imageUrl=data.movieData.imageUrl;
          this.movie.critique=data.movieData.critique;
        });
    }
  }
}
