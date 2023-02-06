import { TestBed } from '@angular/core/testing';

import { MonstersProviderService } from './monsters-provider.service';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalizationLabelService } from '@app/core/services/business/localization-label.service';
import { of } from 'rxjs';
import { BaseEditionDataService } from '@app/core/services/business/base-edition-data.service';

class LocalizationMock {
  getMonster(_: string, __: string): string {
    return 'Test monster';
  }
}
class BaseEditionsServiceMock {
  baseEditionData$ = of({ extendedEditions: ['test'] });
}

describe('MonstersProviderService', () => {
  let service: MonstersProviderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScenariosServicesModule, HttpClientTestingModule],
      providers: [
        { provide: BaseEditionDataService, useClass: BaseEditionsServiceMock },
        { provide: LocalizationLabelService, useClass: LocalizationMock },
      ],
    });
    service = TestBed.inject(MonstersProviderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return available monsters', done => {
    const testData = [
      { name: 'm1', edition: 'test', displayName: 'Test monster' },
      { name: 'm3', edition: 'test', displayName: 'Test monster', deck: 'boss' },
    ];

    service.getAvailableMonsters().subscribe(data => {
      expect(data).toEqual(testData);
      done();
    });

    const request = httpTestingController.expectOne('assets/json/monsters.generated.json');
    request.flush([
      { name: 'm1', edition: 'test' },
      { name: 'm2', edition: 'qwe' },
      { name: 'm3', edition: 'test', deck: 'boss' },
    ]);
    httpTestingController.verify();
  });
});
