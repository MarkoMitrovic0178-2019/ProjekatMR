import { Component, OnInit } from '@angular/core';
import {MovieToWatch} from "../movies-to-watch.model";
import {LoadingController, ModalController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {MoviesToWatchService} from "../movies-to-watch.service";
import {MoviesToWatchModalComponent} from "../movies-to-watch-modal/movies-to-watch-modal.component";

@Component({
  selector: 'app-to-watch',
  templateUrl: './to-watch.page.html',
  styleUrls: ['./to-watch.page.scss'],
})
export class ToWatchPage implements OnInit {
  // moviesToWatch: MoviesToWatch[] = [
  //   {
  //     id: 'w1',
  //     director: 'Quentin Tarantino.',
  //     name:'Django',
  //     imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSnm2FczCxSnt69XUZqqI5-sfy66SvjiV0du9mfUKRRCGqVAurt'
  //   },
  //   {
  //     id: 'w2',
  //     director: 'Martin Scorsese',
  //     name:'Shutter Island',
  //     imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTDqBjsQqiH8fHLE7rmp8Kesh4143AeyVOfnItvVPRpGMMSLfsx'
  //   }
  // ];

  moviesToWatch:MovieToWatch[];

  private movieSub:Subscription;
  constructor(private modalCtrl:ModalController,private moviesToWatchService:MoviesToWatchService,
              ) {

  }
  openMenu(){

  }

  ngOnInit() {
    this.movieSub=this.moviesToWatchService.movieToWatch.subscribe((moviesToWatch)=>{

      this.moviesToWatch=moviesToWatch;
    });
  }
  ionViewWillEnter(){
    this.moviesToWatchService.getMoviesToWatch().subscribe((moviesToWatch)=>{

    });
  }

  openModalToWatch(){
    this.modalCtrl.create({
      component:MoviesToWatchModalComponent
    }).then((modalToWatch)=>{
      modalToWatch.present();
      return modalToWatch.onDidDismiss();

    }).then((resultData)=>{
      if(resultData.role==='confirm'){
        console.log(resultData);
        let {director,name,imageUrl}=resultData.data.movieToWatchData;
        this.moviesToWatchService.addMovieToWatch(director,name,imageUrl).subscribe((moviesToWatch)=>{
          // this.movies=movies;
        });
      }

    });
  }


  ngOnDestroy(){
    if(this.movieSub){
      this.movieSub.unsubscribe();
    }
  }

}
