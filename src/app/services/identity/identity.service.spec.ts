import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { IdentityService } from './identity.service';
import { environment } from '../../../environments/environment';

describe('IdentityService', () => {
  let httpTestingController: HttpTestingController;
  let identity: IdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IdentityService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([IdentityService], (service: IdentityService) => {
    identity = service;
  }));

  it('injects', () => {
    expect(identity).toBeTruthy();
  });

  describe('get', () => {
    it('gets the user', () => {
      identity.get().subscribe(u => expect(u).toEqual({
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'thank.you@forthefish.com'
      }));
      const req = httpTestingController.expectOne(`${environment.dataService}/users/current`);
      expect(req.request.method).toEqual('GET');
      req.flush({
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'thank.you@forthefish.com'
      });
      httpTestingController.verify();
    });

    it('caches the user', () => {
      identity.get().subscribe(u => expect(u).toEqual({
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'thank.you@forthefish.com'
      }));
      const req = httpTestingController.expectOne(`${environment.dataService}/users/current`);
      expect(req.request.method).toEqual('GET');
      req.flush({
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'thank.you@forthefish.com'
      });
      httpTestingController.verify();
      identity.get().subscribe(u => expect(u).toEqual({
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'thank.you@forthefish.com'
      }));
      httpTestingController.verify();
    });
  });

  describe('set', () => {
    it('sets the user, caching it', () => {
      identity.set({
        id: 314159,
        firstName: 'Sherry',
        lastName: 'Pigh',
        email: 'alamode@test.org'
      });
      identity.get().subscribe(u => expect(u).toEqual({
        id: 314159,
        firstName: 'Sherry',
        lastName: 'Pigh',
        email: 'alamode@test.org'
      }));
      httpTestingController.verify();
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      identity.get().subscribe();
      const req = httpTestingController.expectOne(`${environment.dataService}/users/current`);
      expect(req.request.method).toEqual('GET');
      req.flush({
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'thank.you@forthefish.com'
      });
      httpTestingController.verify();
    });

    it('remove the user from the cache (thus forcing a GET on the next get())', () => {
      identity.get().subscribe();
      httpTestingController.verify();
      identity.remove();
      identity.get().subscribe();
      const req = httpTestingController.expectOne(`${environment.dataService}/users/current`);
      expect(req.request.method).toEqual('GET');
      req.flush({
        id: 42,
        firstName: 'Douglas',
        lastName: 'Adams',
        email: 'thank.you@forthefish.com'
      });
      httpTestingController.verify();
    });
  });
});
