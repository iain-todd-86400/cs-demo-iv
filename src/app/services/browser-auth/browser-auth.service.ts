import { Injectable } from '@angular/core';
import {BiometricType, IdentityVault} from '@ionic-enterprise/identity-vault';

@Injectable({
  providedIn: 'root'
})
export class BrowserAuthService implements IdentityVault {

  config = undefined;

  unsubscribe() {
      return Promise.resolve();
  }

  clear() {
    return Promise.resolve();
  }

  lock() {
    return Promise.resolve();
  }

  isLocked() {
    return Promise.resolve(false);
  }

  isInUse() {
    return Promise.resolve(false);
  }

  getConfig() {
    return Promise.resolve(this.config);
  }

  remainingAttempts() {
    return Promise.resolve(5);
  }

  getUsername() {
    return Promise.resolve('MyUsername');
  }

  storeToken(token: any) {
    return Promise.resolve();
  }

  getToken() {
    return Promise.resolve('MyToken');
  }

  storeValue(key: string, value: any) {
    return Promise.resolve();
  }

  getValue(key: string) {
    return Promise.resolve('MyValue');
  }

  getBiometricType() {
    const none: BiometricType = 'none';
    return Promise.resolve(none);
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean) {
    return Promise.resolve();
  }

  isBiometricsEnabled() {
    return Promise.resolve(false);
  }

  isBiometricsAvailable() {
    return Promise.resolve(false);
  }

  isPasscodeSetupNeeded() {
    return Promise.resolve(false);
  }

  setPasscode(passcode?: string) {
    return Promise.resolve();
  }

  isPasscodeEnabled() {
    return Promise.resolve(false);
  }

  setPasscodeEnabled(isPasscodeEnabled: boolean) {
    return Promise.resolve();
  }

  unlock(usingPasscode?: boolean, passcode?: string) {
    return Promise.resolve();
  }
}
