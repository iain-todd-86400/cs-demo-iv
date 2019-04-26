import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  BiometricType,
  IdentityVault,
  PluginConfiguration,
  AuthMode
} from '@ionic-enterprise/identity-vault';

@Injectable({
  providedIn: 'root'
})
export class BrowserAuthService implements IdentityVault {
  constructor(private storage: Storage) {}

  config = {
    authMode: AuthMode.InMemoryOnly,
    descriptor: {
      username: '',
      vaultId: ''
    },
    isBiometricsEnabled: false,
    isPasscodeEnabled: false,
    isPasscodeSetupNeeded: false,
    hideScreenOnBackground: false,
    lockAfter: 50000
  };

  unsubscribe(): Promise<void> {
    return Promise.resolve();
  }

  clear(): Promise<void> {
    return this.storage.clear();
  }

  lock(): Promise<void> {
    return Promise.resolve();
  }

  isLocked(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async isInUse(): Promise<boolean> {
    return !!(await this.storage.get('session'));
  }

  getConfig(): Promise<PluginConfiguration> {
    return Promise.resolve(this.config);
  }

  remainingAttempts(): Promise<number> {
    return Promise.resolve(5);
  }

  getUsername(): Promise<string> {
    return Promise.resolve('MyUsername');
  }

  storeToken(token: any): Promise<void> {
    return Promise.resolve();
  }

  getToken(): Promise<any> {
    return Promise.resolve('MyToken');
  }

  async storeValue(key: string, value: any): Promise<void> {
    console.log('store value:', key, value);
    await this.storage.set(key, value);
  }

  getValue(key: string): Promise<any> {
    console.log('get value:', key);
    return this.storage.get(key);
  }

  getBiometricType(): Promise<BiometricType> {
    const none: BiometricType = 'none';
    return Promise.resolve(none);
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  isBiometricsEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsAvailable(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isPasscodeSetupNeeded(): Promise<boolean> {
    return Promise.resolve(false);
  }

  setPasscode(passcode?: string): Promise<void> {
    return Promise.resolve();
  }

  isPasscodeEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  setPasscodeEnabled(isPasscodeEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  unlock(usingPasscode?: boolean, passcode?: string): Promise<void> {
    return Promise.resolve();
  }
}
