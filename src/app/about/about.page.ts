import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication';
import { IdentityService } from '../services/identity';
import { User } from '../models/user';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  user: User;

  constructor(
    private authentication: AuthenticationService,
    private identity: IdentityService,
    private navController: NavController
  ) {}

  ionViewDidEnter() {
    this.identity.get().subscribe(u => (this.user = u));
  }

  logout() {
    this.authentication
      .logout()
      .subscribe(() => this.navController.navigateRoot('/login'));
  }
}
