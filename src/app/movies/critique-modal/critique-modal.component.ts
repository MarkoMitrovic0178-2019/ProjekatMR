import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-critique-modal',
  templateUrl: './critique-modal.component.html',
  styleUrls: ['./critique-modal.component.scss'],
})
export class CritiqueModalComponent  implements OnInit {
  @ViewChild('frm') form: NgForm;
  @Input() critique: string;

  constructor(private modalControl: ModalController) {
  }

  ngOnInit() {
  }

  onCancel() {
    this.modalControl.dismiss(null,'cancel');
  }

  onAddCritique() {
    if (!this.form.valid) {
      return;
    }

    this.modalControl.dismiss(
      {
        critiqueData: {
          critique:this.form.value['critique']
        }
      },
      'confirm'
    );
  }
}
