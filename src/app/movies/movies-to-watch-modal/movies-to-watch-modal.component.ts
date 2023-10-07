import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-movies-to-watch-modal',
  templateUrl: './movies-to-watch-modal.component.html',
  styleUrls: ['./movies-to-watch-modal.component.scss'],
})
export class MoviesToWatchModalComponent  implements OnInit {

  @ViewChild('fr') form: NgForm;
  @Input() director: string;
  @Input() name: string;
  @Input() imageUrl: string;

  constructor(private modalControl: ModalController) {
  }

  ngOnInit() {
  }

  onCancel() {
    this.modalControl.dismiss(null,'cancel');
  }

  onAddMovieToWatch() {
    if (!this.form.valid) {
      return;
    }

    this.modalControl.dismiss(
      {
        movieToWatchData: {
          director: this.form.value['director'],
          name: this.form.value['name'],
          imageUrl: this.form.value['imageUrl']
        }
      },
      'confirm'
    );
  }

}
