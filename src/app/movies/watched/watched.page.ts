import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../movies.model";
import {ModalController} from "@ionic/angular";
import {MovieModalComponent} from "../movie-modal/movie-modal.component";
import {MoviesService} from "../movies.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-watched',
  templateUrl: './watched.page.html',
  styleUrls: ['./watched.page.scss'],
})
export class WatchedPage implements OnInit,OnDestroy {

  movies: Movie[] = [
    {
      id: 'q1',
      director: 'Quentin Tarantino.',
      name:'Pulp Fiction',
      critique: 'Sasip',
      imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRz_2nKTNlxhVtzbh29kgL3m2ebLv3TlYyzrbyqBtEUxt6mBuZ-',
      userId:'xx'
    },
    {
      id: 'q2',
      director: 'Martin Scorsese',
      name:'Silence',
      critique: 'Ne valja',
      imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRckcEQaIwexDbFMB9DnxkKJveI51yFfSZ5xpS2CQQ7xuBooo1_',
      userId:'yy'
    }
  ];

private movieSub:Subscription;
  constructor(private modalCtrl:ModalController,private moviesService:MoviesService) {

  }
  openMenu(){

  }

  ngOnInit() {
    this.moviesService.movie.subscribe((movie) => {
      this.movies = movie;
    })
  }
  ionViewWillEnter(){
    this.moviesService.getMovies().subscribe((movieData) => {
      console.log(movieData);
      this.movies = movieData;
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MovieModalComponent,
      componentProps: {title: 'Add movie'}
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
      this.moviesService
        .addMovie(data.movieData.director, data.movieData.name,data.movieData.imageUrl,data.movieData.critique)
        .subscribe(res => {
          console.log(res);
        });

    }

  }



  ngOnDestroy(){
    if(this.movieSub){
      this.movieSub.unsubscribe();
    }
}
}
