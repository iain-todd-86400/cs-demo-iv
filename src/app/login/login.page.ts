import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthenticationService } from '../services/authentication';
import { IdentityService } from '../services/identity';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string;
  password: string;
  errorMessage: string;

  biometricType: string;
  displayBiometricLogin: boolean;

  constructor(
    private authentication: AuthenticationService,
    private identity: IdentityService,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    try {
      this.initBiometrics();
    } catch (e) {
      console.error('Unable to check token status', e);
    }
  }

  async biometricAuthClicked() {
    const hasToken = await this.identity.hasStoredToken();

    if (hasToken) {
      const token = await this.identity.getStoredToken();
      if (token) {
        this.goToApp();
        return;
      }
    }

    alert('Unable to authenticate. Please log in again');
  }

  signInClicked() {
    this.authentication.login(this.email, this.password).subscribe((success: boolean) => {
      this.password = '';
      if (success) {
        this.email = '';
        this.errorMessage = '';
        this.navController.navigateRoot('/tabs/home');
      } else {
        this.errorMessage = 'Invalid e-mail address or password';
      }
    });
  }

  private goToApp() {
    this.navController.navigateRoot('/tabs/(home:home)');
  }

  private async biometricsEnabled(): Promise<boolean> {
    const res = await Promise.all([
      this.identity.hasStoredToken(),
      this.identity.isBiometricsEnabled()
    ]);
    return res[0] && res[1];
  }

  private async initBiometrics(): Promise<void> {
    if (await this.biometricsEnabled()) {
      this.displayBiometricLogin = true;
      this.biometricType = await this.identity.getBiometricType();
    } else {
      this.displayBiometricLogin = false;
      this.biometricType = '';
    }
  }
}
