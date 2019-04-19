import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IdentityService } from '../identity';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private identity: IdentityService) {}

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
            this.identity.set(r.user, r.token);
          }
        }),
        map(r => r.success)
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.dataService}/logout`, {}).pipe(
      tap(() => {
        this.identity.remove();
      })
    );
  }

  private async unpackResponse(r: any): Promise<boolean> {
    if (r.success) {
      await this.identity.set(r.user);
      await this.identity.setToken(r.token);
    }
    return r.success;
  }
}
