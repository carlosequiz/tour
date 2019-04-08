import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private isLoggedIn: Boolean;
  private user_email: String;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authenticationService: AuthenticationService,
    private navCtrl: NavController,

  ) {
    this.initializeApp();
    this.authenticationService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Logged out");
          this.isLoggedIn = false;
          this.navCtrl.navigateForward('/')
        } else {
          this.isLoggedIn = true;
          this.navCtrl.navigateForward('/dashboard')
        }
      }
    )

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
