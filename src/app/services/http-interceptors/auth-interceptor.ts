import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { IdentityService } from '../identity';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public identity: IdentityService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(
      this.identity.getToken().then(token => {
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + token
            }
          });
        }
      })
    ).pipe(flatMap(() => next.handle(req)));
  }
}
