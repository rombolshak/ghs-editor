import { TestBed } from '@angular/core/testing';

import { GhseDataStorageService } from './ghse-data-storage.service';

describe('GhseDataStorageService', () => {
  let service: GhseDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhseDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
