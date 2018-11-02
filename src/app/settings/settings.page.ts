import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  constructor(
    private authentication: AuthenticationService,
    private navController: NavController
  ) {}

  logout() {
    this.authentication.logout();
    this.navController.navigateRoot('/login');
  }
}
