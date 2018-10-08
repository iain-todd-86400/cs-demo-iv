import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { of } from 'rxjs';

import { AuthenticationService, createAuthenticationServiceMock } from '../services/authentication';
import { LoginPage } from './login.page';
import { createNavControllerMock } from '../../../test/mocks';

describe('LoginPage', () => {
  let authenticationServiceMock;
  let navCtrl;

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    authenticationServiceMock = createAuthenticationServiceMock();
    navCtrl = createNavControllerMock();
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [FormsModule, IonicModule],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceMock },
        { provide: NavController, useValue: navCtrl }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('clicking the "Sign in" button', () => {
    it('performs the login', () => {
      component.signInClicked();
      expect(authenticationServiceMock.login).toHaveBeenCalledTimes(1);
    });

    it('passes the entered e-mail and password', () => {
      component.email = 'jimmy@test.org';
      component.password = 'I Crack the Corn';
      component.signInClicked();
      expect(authenticationServiceMock.login).toHaveBeenCalledWith(
        'jimmy@test.org',
        'I Crack the Corn'
      );
    });

    describe('on success', () => {
      beforeEach(() => {
        authenticationServiceMock.login.and.returnValue(of(true));
        component.email = 'jimmy@test.org';
        component.password = 'I Crack the Corn';
      });

      it('clears the entered email and password', () => {
        component.signInClicked();
        expect(component.email).toBeFalsy();
        expect(component.password).toBeFalsy();
      });

      it('clears any existing error message', () => {
        component.errorMessage = 'failed to log in';
        component.signInClicked();
        expect(component.errorMessage).toBeFalsy();
      });

      it('navigates to the main page', () => {
        component.signInClicked();
        expect(navCtrl.navigateRoot).toHaveBeenCalledTimes(1);
        expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/tabs/(home:home)');
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        authenticationServiceMock.login.and.returnValue(of(false));
        component.email = 'jimmy@test.org';
        component.password = 'I Crack the Corn';
      });

      it('clears just the password', () => {
        component.signInClicked();
        expect(component.email).toEqual('jimmy@test.org');
        expect(component.password).toBeFalsy();
      });

      it('displays an error message', () => {
        component.signInClicked();
        expect(component.errorMessage).toEqual('Invalid e-mail address or password');
      });

      it('does not navigate', () => {
        component.signInClicked();
        expect(navCtrl.navigateRoot).not.toHaveBeenCalled();
      });
    });
  });
});
