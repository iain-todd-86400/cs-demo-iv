import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IdentityService } from '../identity';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private identity: IdentityService,
    private storage: Storage
  ) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<{ success: boolean; user: User; token: string }>(
        `${environment.dataService}/login`,
        {
          username: email,
          password: password
        }
      )
      .pipe(
        tap(async r => {
          if (r.success) {
            this.identity.set(r.user);
            await this.storage.ready();
            this.storage.set('auth-token', r.token);
          }
        }),
        map(r => r.success)
      );
  }

  logout(): Observable<any> {
    this.storage.remove('auth-token');
    this.identity.remove();
    return this.http.post(`${environment.dataService}/logout`, {});
  }
}
