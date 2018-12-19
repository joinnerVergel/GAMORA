import { TestBed, inject } from '@angular/core/testing';

import { DataEncryptionService } from './data-encryption.service';

describe('DataEncryptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataEncryptionService]
    });
  });

  it('should be created', inject([DataEncryptionService], (service: DataEncryptionService) => {
    expect(service).toBeTruthy();
  }));
});
