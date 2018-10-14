import { Injectable } from '@angular/core';
import { IonicNativeAuthVaultService } from 'ionic-enterprise-identity-vault';

@Injectable({
  providedIn: 'root'
})
export class BrowserAuthService implements IonicNativeAuthVaultService {
  clear(): Promise<void> {
    return Promise.resolve();
  }

  lock(): Promise<void> {
    return Promise.resolve();
  }

  isLocked(): Promise<boolean> {
    return Promise.resolve(true);
  }

  hasStoredToken(): Promise<boolean> {
    return Promise.resolve(true);
  }

  getToken(): Promise<any> {
    return Promise.resolve('IamAToken');
  }

  getStoredUsername(): Promise<any> {
    return Promise.resolve('billy@jim.bob.com');
  }

  storeToken(username: string, token: string): Promise<void> {
    return Promise.resolve();
  }

  getBiometricType(): Promise<string> {
    return Promise.resolve('blood');
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  isBiometricsEnabled(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
