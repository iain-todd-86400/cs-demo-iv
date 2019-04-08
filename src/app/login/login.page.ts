import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AuthenticationService } from '../services/authentication';
import { IdentityService } from '../services/identity';
import { AuthMode } from '@ionic-enterprise/identity-vault';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string;
  password: string;
  errorMessage: string;

  loginType: string;
  displayVaultLogin: boolean;

  constructor(
    private authentication: AuthenticationService,
    private identity: IdentityService,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    try {
      this.initLoginType();
    } catch (e) {
      console.error('Unable to check token status', e);
    }
  }

  async unlockClicked() {
    const hasSession = await this.identity.hasStoredSession();

    if (hasSession) {
      const session = await this.identity.restoreSession();
      if (session && session.token) {
        this.goToApp();
        return;
      }
    }

    alert('Unable to authenticate. Please log in again');
  }

  signInClicked() {
    this.authentication.login(this.email, this.password).subscribe(
      (success: boolean) => {
        this.password = '';
        if (success) {
          this.email = '';
          this.errorMessage = '';
          this.navController.navigateRoot('/tabs/home');
        } else {
          this.errorMessage = 'Invalid e-mail address or password';
        }
      },
      (err: any) => {
        this.password = '';
        this.errorMessage = 'Unknown login error';
        console.error(err);
      }
    );
  }

  private goToApp() {
    this.navController.navigateRoot('/tabs/home');
  }

  private async initLoginType(): Promise<void> {
    if (await this.identity.hasStoredSession()) {
      this.displayVaultLogin = true;
      const authMode = await this.identity.getAuthMode();
      switch (authMode) {
        case AuthMode.BiometricAndPasscode:
          this.loginType = await this.translateBiometricType();
          this.loginType += ' (Passcode Fallback)';
          break;
        case AuthMode.BiometricOnly:
          this.loginType = await this.translateBiometricType();
          break;
        case AuthMode.PasscodeOnly:
          this.loginType = 'Passcode';
          break;
      }
    } else {
      this.displayVaultLogin = false;
      this.loginType = '';
    }
  }

  private async translateBiometricType(): Promise<string> {
    const type = await this.identity.getBiometricType();
    switch (type) {
      case 'touchID':
        return 'TouchID';
      case 'faceID':
        return 'FaceID';
    }

    return type;
  }
}
