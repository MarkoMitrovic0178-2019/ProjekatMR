import {Component, Input, OnInit} from '@angular/core';
import {MovieToWatch} from "../../movies-to-watch.model";
import {AlertController, LoadingController, ModalController} from "@ionic/angular";
import {MoviesToWatchService} from "../../movies-to-watch.service";
import {MoviesToWatchModalComponent} from "../../movies-to-watch-modal/movies-to-watch-modal.component";
import {MoviesService} from "../../movies.service";
import {CritiqueModalComponent} from "../../critique-modal/critique-modal.component";

@Component({
  selector: 'app-movies-to-watch-element',
  templateUrl: './movies-to-watch-element.component.html',
  styleUrls: ['./movies-to-watch-element.component.scss'],
})
export class MoviesToWatchElementComponent  implements OnInit {

  @Input() movieToWatch:MovieToWatch={id:'w3',director:'Quentin Tarantino',name:'Neki',
    imageUrl:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F81%2F220481-050-55413025%2FQuentin-Tarantino-2020.jpg&tbnid=b7HQU3mLTjOJWM&vet=12ahUKEwjeprClvtSAAxW7_rsIHYaKCZoQMygCegUIARDxAQ..i&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fbiography%2FQuentin-Tarantino&docid=1pwyK5_JfvEEjM&w=1121&h=1600&q=quentin%20tarantino&ved=2ahUKEwjeprClvtSAAxW7_rsIHYaKCZoQMygCegUIARDxAQ',
  userId:'u1'};

   constructor(private modalCtrl:ModalController,private moviesToWatchService:MoviesToWatchService,
                private loadingCtrl:LoadingController,private moviesService:MoviesService,private alertCtrl:AlertController) {}

  ngOnInit() {}

  async onDeleteMovieToWatch() {
    const alert = await this.alertCtrl.create(
      {
        header: '',
        message: 'Do you want to add this movie to watched movies?',
        buttons: [{text:'Yes',role:'Yes'},{text:'No',role:'No'}]
      }
    );
    const modal =  await this.modalCtrl.create({
      component: CritiqueModalComponent,
      componentProps: {title: 'Add critique'}
    });

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

      if (deleteButton === 'Yes') {
        await alert.present();
        alert.onDidDismiss().then((async (alertData) => {
          const buttonClicked = alertData.role;

          if (buttonClicked === 'Yes') {

            modal.present();
            const {data: modalData, role:ModalRole} = await modal.onWillDismiss();
            if (ModalRole === 'confirm') {
              console.log(modalData);
              this.moviesService
                .addMovie(this.movieToWatch.director, this.movieToWatch.name, this.movieToWatch.imageUrl, modalData.critiqueData.critique)
                .subscribe(res => {
                  console.log(res);

                });
              this.moviesToWatchService.deleteMovieToWatch(this.movieToWatch.id).subscribe(async () => {
              });

            }
          } else {
            this.moviesToWatchService.deleteMovieToWatch(this.movieToWatch.id).subscribe(async () => {
            });
          }
        }));

      }
    }));



    }

  async onEditMovieToWatch() {
    const modal = await this.modalCtrl.create({
      component: MoviesToWatchModalComponent,
      componentProps: {title: 'Edit movie', director: this.movieToWatch.director, name: this.movieToWatch.name,imageUrl:this.movieToWatch.imageUrl}
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.moviesToWatchService
        .editMovieToWatch(
          this.movieToWatch.id,
          data.movieToWatchData.director,
          data.movieToWatchData.name,
          data.movieToWatchData.imageUrl,
          this.movieToWatch.userId)
        .subscribe((res) => {
          this.movieToWatch.name = data.movieData.name;
          this.movieToWatch.director = data.movieData.director;
          this.movieToWatch.imageUrl=data.movieData.imageUrl;
        });
    }
  }
}
