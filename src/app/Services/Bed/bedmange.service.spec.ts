import { TestBed } from '@angular/core/testing';

import { BedmangeService } from './bedmange.service';

describe('BedmangeService', () => {
  let service: BedmangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedmangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
