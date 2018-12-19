import { TestBed, inject } from '@angular/core/testing';

import { EventsManagerService } from './events-manager.service';

describe('EventsManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsManagerService]
    });
  });

  it('should be created', inject([EventsManagerService], (service: EventsManagerService) => {
    expect(service).toBeTruthy();
  }));
});
