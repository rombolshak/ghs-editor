import { TestBed } from '@angular/core/testing';

import { LocalizationLabelService } from './localization-label.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { BaseEditionDataService } from '@app/core/services/business/base-edition-data.service';

class BaseEditionsServiceMock {
  baseEditionData$ = of({ extendedEditions: ['test'] });
}

describe('LocalizationLabelService', () => {
  let service: LocalizationLabelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: BaseEditionDataService, useClass: BaseEditionsServiceMock }],
    });
    service = TestBed.inject(LocalizationLabelService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load edition labels on start', () => {
    httpTestingController.expectOne('assets/json/ghs-data/test/label.json');
    httpTestingController.verify();
  });

  it('should return monster name', () => {
    const request = httpTestingController.expectOne('assets/json/ghs-data/test/label.json');
    request.flush({ en: { edition: { test: 'Test edition' }, monster: { test: 'Test monster' } } });
    expect(service.getMonster('test', 'test')).toBe('Test monster');
    expect(service.getMonster('test', 'test2')).toBe('');
    expect(service.getMonster('test2', 'test')).toBe('');
  });
});
