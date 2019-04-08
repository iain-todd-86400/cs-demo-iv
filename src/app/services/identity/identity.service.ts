import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Platform } from '@ionic/angular';
import {
  AuthMode,
  IonicIdentityVaultUser,
  DefaultSession,
  VaultConfig,
  VaultError,
} from '@ionic-enterprise/identity-vault';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends IonicIdentityVaultUser<DefaultSession> {
  private user: User;

  changed: Subject<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    platform: Platform
  ) {
    super(platform, {
      authMode: AuthMode.BiometricAndPasscode,
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: true,
      lockAfter: 5000,
      hideScreenOnBackground: true
    });
    this.changed = new Subject();
  }

  get(): Observable<User> {
    if (!this.user) {
      return this.http
        .get<User>(`${environment.dataService}/users/current`)
        .pipe(tap(u => (this.user = u)));
    } else {
      return of(this.user);
    }
  }

  async set(user: User, token: string): Promise<void> {
    this.user = user;
    await this.saveSession({username: user.email, token: token});
    this.changed.next(this.user);
  }

  async remove(): Promise<void> {
    await this.logout();
    this.user = undefined;
    this.changed.next(this.user);
  }

  async getToken(): Promise<string> {
    if (!this.token) {
      await this.restoreSession();
    }
    return this.token;
  }

  onSessionRestored(session: DefaultSession) {
    console.log('Session Restored: ', session);
  }

  onSetupError(error: VaultError): void {
    console.error('Get error during setup', error);
  }

  onConfigChange(config: VaultConfig): void {
    console.log('Got a config update: ', config);
  }

  onVaultReady(config: VaultConfig): void {
    console.log('The service is ready with config: ', config);
  }

  onVaultUnlocked(config: VaultConfig): void {
    console.log('The vault was unlocked with config: ', config);
  }

  onPasscodeRequest(isPasscodeSetRequest: boolean) {
    // NOTE: You can use this to display a customer passcode prompt
    // to the user and then return the input
    console.log('Passcode Requested - Was for Setup?: ', isPasscodeSetRequest);
    return undefined;
  }

  onVaultLocked() {
    console.log('Vault Locked');
    this.router.navigate(['login']);
  }
}
