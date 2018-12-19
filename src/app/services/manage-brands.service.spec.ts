import { TestBed, inject } from '@angular/core/testing';

import { ManageBrandsService } from './manage-brands.service';

describe('ManageBrandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageBrandsService]
    });
  });

  it('should be created', inject([ManageBrandsService], (service: ManageBrandsService) => {
    expect(service).toBeTruthy();
  }));
});
