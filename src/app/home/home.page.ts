import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthenticationService } from '../services/authentication';
import { TeaCategory } from '../models/tea-category';
import { TeaCategoriesService } from '../services/tea-categories';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  categories: Array<TeaCategory>;

  constructor(
    private authentication: AuthenticationService,
    private navController: NavController,
    private teaCategories: TeaCategoriesService
  ) {}

  ngOnInit() {
    this.teaCategories.getAll().subscribe(x => (this.categories = x));
  }

  logout() {
    this.authentication
      .logout()
      .subscribe(() => this.navController.navigateRoot('/login'));
  }
}
