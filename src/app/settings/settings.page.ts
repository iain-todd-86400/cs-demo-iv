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
  biometricType: string;

  constructor(
    private authentication: AuthenticationService,
    private identity: IdentityService,
    private navController: NavController
  ) {}

  async ngOnInit() {
    await this.identity.ready();
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

  private translateBiometricType(type: string): string {
    switch (type) {
      case 'touchid':
        return 'TouchID';
      case 'faceid':
        return 'FaceID';
      case 'fingerprint':
        return 'Fingerprint';
    }

    return type;
  }
}
