import { TestBed } from '@angular/core/testing';

import { LocalDataManagerService } from './local-data-manager.service';
import { EditionBaseData } from '@app/shared/models/base-data';

describe('LocalDataManagerService', () => {
  let service: LocalDataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDataManagerService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if no data saved', () => {
    service.baseData.get().subscribe((data) => expect(data).toBeNull());
  });

  it('should return saved data', () => {
    const data = {} as EditionBaseData;
    data.editionPrefix = 'test';
    data.extendedEditions = ['aaa'];
    service.baseData.save(data);
    service.baseData.get().subscribe((loadedData) => {
      expect(loadedData).toEqual(data);
    });
  });
});
