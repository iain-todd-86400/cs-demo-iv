import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Platform } from '@ionic/angular';
import {
  AuthMethod,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin
} from 'ionic-enterprise-identity-vault';

import { BrowserAuthPlugin } from '../browser-auth/browser-auth.plugin';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends IonicIdentityVaultUser {
  private user: User;

  changed: Subject<User>;

  constructor(
    private browserAuthPlugin: BrowserAuthPlugin,
    private http: HttpClient,
    public platform: Platform, // TODO: ask why this is public...
    private router: Router
  ) {
    super(platform, {
      authMethod: AuthMethod.PinFallback,
      enableBiometrics: true,
      lockOnClose: false,
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
    await this.saveSession(user.email, token);
    this.changed.next(this.user);
  }

  async remove(): Promise<void> {
    await this.logout();
    this.user = undefined;
    this.changed.next(this.user);
  }

  async getToken(): Promise<string> {
    if (!this.token) {
      await this.ready();
    }
    return Promise.resolve(this.token);
  }

  onSessionRestored(token: string) {
    this.token = token;
  }

  onVaultLocked() {
    this.token = null;
    this.router.navigate(['login']);
  }

  getPlugin(): IonicNativeAuthPlugin {
    if (this.platform.is('cordova')) {
      return super.getPlugin();
    } else {
      return this.browserAuthPlugin;
    }
  }
}
