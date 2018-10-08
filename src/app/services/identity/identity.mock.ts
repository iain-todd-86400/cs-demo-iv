import { of } from 'rxjs';

export function createIdentityServiceMock() {
  return jasmine.createSpyObj('IdentityService', {
    get: of(null),
    set: undefined,
    remove: undefined
  });
}
