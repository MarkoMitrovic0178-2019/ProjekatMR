import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading=false;


  constructor(private authService:AuthService,private router:Router,private alertCtrl:AlertController) {

  }

  ngOnInit() {
  }

  onLogIn(logInForm: NgForm) {
    this.isLoading=true;
    if (logInForm.valid) {
      this.authService.logIn(logInForm.value)
        .subscribe(
          {
            next: (resData) => {
              this.isLoading=false;
              this.router.navigateByUrl("/movies/tabs/watched");
            },
            error: async (errRes) => {
              let message = 'Incorrect email or password';

              // const code = errRes.error.error.message;
              // if (code === 'EMAIL_NOT_FOUND') {
              //     message = 'Email address could not be found.';
              // } else if (code === 'INVALID_PASSWORD') {
              //     message = 'Incorrect password';
              // }

              const alert = await this.alertCtrl.create(
                {
                  header: 'Authentication failed',
                  message,
                  buttons: ['Okay']
                }
              );
              await alert.present();
              this.isLoading=false;
              logInForm.reset();
            }
          }
        );
    }
  }


}
