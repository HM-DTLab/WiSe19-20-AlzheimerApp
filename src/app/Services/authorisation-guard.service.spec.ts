import { TestBed } from '@angular/core/testing';

import { AuthorisationGuardService } from './authorisation-guard.service';

describe('AuthorisationGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorisationGuardService = TestBed.get(AuthorisationGuardService);
    expect(service).toBeTruthy();
  });
});
