import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  constructor(
    private authentication: AuthenticationService,
    private navController: NavController
  ) {}

  logout() {
    this.authentication.logout();
    this.navController.navigateRoot('/login');
  }
}
