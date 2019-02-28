import { TestBed, inject } from '@angular/core/testing';

import { RONAnConfigurationService } from './ronan-configuration.service';

describe('RONAnConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RONAnConfigurationService]
    });
  });

  it('should be created', inject([RONAnConfigurationService], (service: RONAnConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
