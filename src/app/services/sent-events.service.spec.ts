import { TestBed, inject } from '@angular/core/testing';

import { SentEventsService } from './sent-events.service';

describe('SentEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentEventsService]
    });
  });

  it('should be created', inject([SentEventsService], (service: SentEventsService) => {
    expect(service).toBeTruthy();
  }));
});
