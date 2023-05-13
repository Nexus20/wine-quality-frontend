import { TestBed } from '@angular/core/testing';

import { GrapeSortsService } from './grape-sorts.service';

describe('GrapeSortsService', () => {
  let service: GrapeSortsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrapeSortsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
