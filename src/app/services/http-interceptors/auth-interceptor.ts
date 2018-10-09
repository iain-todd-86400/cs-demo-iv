// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import {
//   HttpEvent,
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest
// } from '@angular/common/http';

// import { IdentityService } from '../identity';

// @Injectable()
// export class IdentityVaultHttpInterceptor implements HttpInterceptor {
//   constructor(public identity: IdentityService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (this.user.token) {
//       req = req.clone({
//         setHeaders: {
//           Authorization: 'Bearer ' + this.user.token
//         }
//       });
//     }

//     return next.handle(req);
//   }
// }
