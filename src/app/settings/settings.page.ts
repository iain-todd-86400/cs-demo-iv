import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IdentityService } from '../services/identity';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  useBiometrics: boolean;
  usePasscode: boolean;
  biometricType: string;

  constructor(
    private authentication: AuthenticationService,
    private identity: IdentityService,
    private navController: NavController
  ) {}

  async ngOnInit() {
    await this.identity.ready();
    this.usePasscode = await  this.identity.isPasscodeEnabled();
    this.useBiometrics = await this.identity.isBiometricsEnabled();
    const type = await this.identity.getBiometricType();
    this.biometricType = this.translateBiometricType(type);
  }

  logout() {
    this.authentication
      .logout()
      .subscribe(() => this.navController.navigateRoot('/login'));
  }

  useBiometricsChanged() {
    this.identity.setBiometricsEnabled(this.useBiometrics);
  }

  lock() {
    this.identity.lockOut();
  }

  usePasscodeChanged() {
    this.identity.setPasscodeEnabled(this.usePasscode);
  }

  private translateBiometricType(type: string): string {
    switch (type) {
      case 'touchID':
        return 'TouchID';
      case 'faceID':
        return 'FaceID';
    }

    return type;
  }
}
