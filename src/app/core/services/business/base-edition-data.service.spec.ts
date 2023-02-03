import { TestBed } from '@angular/core/testing';

import { BaseEditionDataService } from './base-edition-data.service';
import { BaseEditionData, initialBaseDataModel } from '@app/core/models/edition-base.models';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';

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
    service.baseEditionData$.subscribe(data => expect(data).toEqual(initialBaseDataModel));
  });

  it('should return saved data', () => {
    const data = {} as BaseEditionData;
    data.editionPrefix = 'test';
    data.extendedEditions = ['aaa'];
    localStorage.setItem('ghse-data/base', JSON.stringify(data));
    const service = new BaseEditionDataService(new GhseDataStorageService());
    service.baseEditionData$.subscribe(model => {
      expect(model).toEqual({ ...initialBaseDataModel, ...data });
    });
    localStorage.clear();
  });

  it('should update data observable', done => {
    const data = {} as BaseEditionData;
    data.editionPrefix = 'test';
    data.extendedEditions = ['aaa'];
    service.updateFullData(data);
    service.baseEditionData$.subscribe(loadedData => {
      expect(loadedData).toEqual(data);
      done();
    });
    localStorage.clear();
  });
});
