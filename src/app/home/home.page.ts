import { Component, OnInit } from '@angular/core';

import { TeaCategory } from '../models/tea-category';
import { TeaCategoriesService } from '../services/tea-categories';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  categories: Array<TeaCategory>;

  constructor(private teaCategories: TeaCategoriesService) {}

  ngOnInit() {
    this.teaCategories.getAll().subscribe(x => this.categories = x);
  }
}
