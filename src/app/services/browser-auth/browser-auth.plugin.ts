import { Injectable } from '@angular/core';
import {
  IonicNativeAuthConfig,
  IonicNativeAuthPlugin,
  IonicNativeAuthService,
  IonicNativeAuthVaultConfig,
  IonicNativeAuthVaultService
} from 'ionic-enterprise-identity-vault';
import { BrowserAuthService } from './browser-auth.service';

@Injectable({ providedIn: 'root' })
export class BrowserAuthPlugin implements IonicNativeAuthPlugin {
  constructor(private browserAuthService: BrowserAuthService) {}

  setup(config: IonicNativeAuthConfig): IonicNativeAuthService {
    return null;
  }

  createVault(config: IonicNativeAuthVaultConfig): IonicNativeAuthVaultService {
    return this.browserAuthService;
  }
}
