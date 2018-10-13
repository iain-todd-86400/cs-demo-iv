import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  constructor(
    private authentication: AuthenticationService,
    private navController: NavController
  ) {}

  logout() {
    this.authentication.logout();
    this.navController.navigateRoot('/login');
  }
}
