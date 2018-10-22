import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { AboutPage } from './about.page';
import {
  createAuthenticationServiceMock,
  AuthenticationService
} from '../services/authentication';
import { createNavControllerMock } from '../../../test/mocks';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;
  let authentication;
  let navController;

  beforeEach(async(() => {
    authentication = createAuthenticationServiceMock();
    navController = createNavControllerMock();
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: AuthenticationService, useValue: authentication },
        { provide: NavController, useValue: navController }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
