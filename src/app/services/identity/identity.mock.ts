import { of } from 'rxjs';

export function createIdentityServiceMock() {
  return jasmine.createSpyObj('IdentityService', {
    get: of(null),
    hasStoredToken: Promise.resolve(false),
    getBiometricType: Promise.resolve(''),
    getStoredToken: Promise.resolve(''),
    isBiometricsEnabled: Promise.resolve(false),
    ready: Promise.resolve(),
    remove: undefined,
    set: undefined
  });
}
