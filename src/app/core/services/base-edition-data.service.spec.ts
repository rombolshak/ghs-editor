import { TestBed } from '@angular/core/testing';

import { BaseEditionData, BaseEditionDataService, initialModel } from './base-edition-data.service';

describe('BaseEditionDataService', () => {
  let service: BaseEditionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseEditionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if no data saved', () => {
    service.baseEditionData$.subscribe(data => expect(data).toEqual(initialModel));
  });

  it('should return saved data', () => {
    const data = {} as BaseEditionData;
    data.editionPrefix = 'test';
    data.extendedEditions = ['aaa'];
    service.updateFullData(data);
    service.baseEditionData$.subscribe(loadedData => {
      expect(loadedData).toEqual(data);
    });
    localStorage.clear();
  });
});
