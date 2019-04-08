import { Injectable } from '@angular/core';
import {
  IdentityVault, IdentityVaultConfig,
  IonicNativeAuthPlugin,
} from '@ionic-enterprise/identity-vault';
import { BrowserAuthService } from './browser-auth.service';

@Injectable({ providedIn: 'root' })
export class BrowserAuthPlugin implements IonicNativeAuthPlugin {
  constructor(private browserAuthService: BrowserAuthService) {}

  getVault(config: IdentityVaultConfig): IdentityVault {
    return this.browserAuthService;
  }
}
