import { TestBed, inject } from '@angular/core/testing';

import { SymbolsService } from './symbols.service';

describe('SymbolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SymbolsService]
    });
  });

  it('should be created', inject([SymbolsService], (service: SymbolsService) => {
    expect(service).toBeTruthy();
  }));
});
