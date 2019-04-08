import { of } from 'rxjs';

export function createIdentityServiceMock() {
  return jasmine.createSpyObj('IdentityService', {
    get: of(null),
    hasStoredSession: Promise.resolve(false),
    getAuthMode: Promise.resolve(''),
    getBiometricType: Promise.resolve(''),
    isBiometricsEnabled: Promise.resolve(false),
    isPasscodeEnabled: Promise.resolve(false),
    ready: Promise.resolve(),
    remove: Promise.resolve(),
    restoreSession: Promise.resolve(),
    set: Promise.resolve()
  });
}
