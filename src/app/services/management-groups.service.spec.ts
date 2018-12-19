import { TestBed, inject } from '@angular/core/testing';

import { ManagementGroupsService } from './management-groups.service';

describe('ManagementGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagementGroupsService]
    });
  });

  it('should be created', inject([ManagementGroupsService], (service: ManagementGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
