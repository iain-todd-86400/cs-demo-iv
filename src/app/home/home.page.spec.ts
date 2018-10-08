import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import {
  createTeaCategoriesServiceMock,
  TeaCategoriesService
} from '../services/tea-categories';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let teaCategories;

  beforeEach(async(() => {
    teaCategories = createTeaCategoriesServiceMock();
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: TeaCategoriesService, useValue: teaCategories }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
