import { TestBed } from '@angular/core/testing';

import { PredefinedEditionsDataService } from './predefined-editions-data.service';

describe('PredefinedEditionsDataService', () => {
  let service: PredefinedEditionsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefinedEditionsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
