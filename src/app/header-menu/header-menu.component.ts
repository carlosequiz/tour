import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  errorMessage: string = '';
  isMenuClosed;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    public menuCtrl: MenuController,
  ) { }

  ngOnInit() {
  }

  logutUser(value){
    this.authService.logoutUser(value)
    .then(
      res => {
        this.isMenuClosed = this.menuCtrl.close();
        this.navCtrl.navigateForward('/');
      }, err => {
        this.errorMessage = err.message;
      })
  }

}
