import { TestBed } from '@angular/core/testing';

import { QrCodeInfoService } from './qr-code-info.service';

describe('QrCodeInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrCodeInfoService = TestBed.get(QrCodeInfoService);
    expect(service).toBeTruthy();
  });
});
