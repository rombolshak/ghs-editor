import { TestBed } from '@angular/core/testing';
import { EditionDataLoaderGuard } from '@app/core/guards/edition-data-loader.guard';
import { Observable, of } from 'rxjs';
import { BaseEditionData, BaseEditionDataService } from '@app/core/services/base-edition-data.service';

class FakeDataService {
  baseEditionData$: Observable<BaseEditionData> | undefined;
}

describe('Pages loader guard', () => {
  let guard: EditionDataLoaderGuard;
  let dataService: FakeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BaseEditionDataService, useClass: FakeDataService }],
    });
    guard = TestBed.inject(EditionDataLoaderGuard);
    dataService = TestBed.inject(BaseEditionDataService) as unknown as FakeDataService;
  });

  it('should deny load on empty edition data', () => {
    dataService.baseEditionData$ = of({ editionName: '', editionPrefix: '' } as BaseEditionData);
    const result = guard.canLoad({}, []) as Observable<boolean>;
    expect(result.subscribe).toBeDefined();
    result.subscribe(value => expect(value).toBeFalse());
  });

  it('should allow load on non empty edition data', () => {
    dataService.baseEditionData$ = of({ editionName: 'zxc', editionPrefix: 'qwe' } as BaseEditionData);
    const result = guard.canLoad({}, []) as Observable<boolean>;
    expect(result.subscribe).toBeDefined();
    result.subscribe(value => expect(value).toBeTrue());
  });
});
