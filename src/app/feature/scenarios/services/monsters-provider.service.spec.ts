import { TestBed } from '@angular/core/testing';

import { MonstersProviderService } from './monsters-provider.service';

describe('MonstersProviderService', () => {
  let service: MonstersProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonstersProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
