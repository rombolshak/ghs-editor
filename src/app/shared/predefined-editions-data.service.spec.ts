import { TestBed } from '@angular/core/testing';

import { PredefinedEditionsDataService } from './predefined-editions-data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AvailableEdition } from '@app/shared/models/available-edition';

describe('PredefinedEditionsDataService', () => {
  let service: PredefinedEditionsDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PredefinedEditionsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request available editions', () => {
    service.getAvailableEditions().subscribe((data) => {
      expect(data.length).toBe(2);
      const e1 = data.find((e) => e.prefix === 'gh-test');
      const e2 = data.find((e) => e.prefix === 'test-ed');
      expect(e1).toBeTruthy();
      expect(e2).toBeTruthy();
      expect(e1?.name).toBe('Test GH edition 1');
      expect(e2?.name).toBe('Other test edition 2');
    });

    const requestEditions = httpTestingController.expectOne(
      'assets/json/predefined-editions.json'
    );
    requestEditions.flush(['gh-test', 'test-ed']);
    const editionBase1 = httpTestingController.expectOne(
      'assets/json/ghs-data/gh-test/label.json'
    );
    const editionBase2 = httpTestingController.expectOne(
      'assets/json/ghs-data/test-ed/label.json'
    );
    editionBase1.flush({ en: { edition: { 'gh-test': 'Test GH edition 1' } } });
    editionBase2.flush({
      en: { edition: { 'test-ed': 'Other test edition 2' } },
    });
    httpTestingController.verify();
  });

  it('should return edition conditions', () => {
    service
      .getEditionConditions(new AvailableEdition('test ed', 'test'))
      .subscribe((data) => expect(data).toEqual(['c1', 'c2']));
    const request = httpTestingController.expectOne(
      'assets/json/ghs-data/test/base.json'
    );
    request.flush({ conditions: ['c1', 'c2'] });
    httpTestingController.verify();
  });
});
