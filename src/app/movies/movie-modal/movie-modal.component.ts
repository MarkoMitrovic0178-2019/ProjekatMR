import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
})
export class MovieModalComponent  implements OnInit {
  @ViewChild('f') form: NgForm;
  @Input() director: string;
  @Input() name: string;
  @Input() imageUrl: string;
  @Input() critique: string;

  constructor(private modalControl: ModalController) {
  }

  ngOnInit() {
  }

  onCancel() {
    this.modalControl.dismiss(null,'cancel');
  }

  onAddMovie() {
    if (!this.form.valid) {
      return;
    }

    this.modalControl.dismiss(
      {
        movieData: {
          director: this.form.value['director'],
          name: this.form.value['name'],
          imageUrl:this.form.value['imageUrl'],
          critique:this.form.value['critique']
        }
      },
      'confirm'
    );
  }
}
