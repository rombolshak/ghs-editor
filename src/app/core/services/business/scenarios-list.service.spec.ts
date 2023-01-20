import { TestBed } from '@angular/core/testing';

import { ScenariosListService } from './scenarios-list.service';

describe('ScenariosListService', () => {
  let service: ScenariosListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenariosListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
