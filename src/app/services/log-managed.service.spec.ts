import { TestBed, inject } from '@angular/core/testing';

import { LogManagedService } from './log-managed.service';

describe('LogManagedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogManagedService]
    });
  });

  it('should be created', inject([LogManagedService], (service: LogManagedService) => {
    expect(service).toBeTruthy();
  }));
});
