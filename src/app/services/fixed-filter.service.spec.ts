import { TestBed, inject } from '@angular/core/testing';

import { FixedFilterService } from './fixed-filter.service';

describe('FixedFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixedFilterService]
    });
  });

  it('should be created', inject([FixedFilterService], (service: FixedFilterService) => {
    expect(service).toBeTruthy();
  }));
});
