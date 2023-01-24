import { TestBed } from '@angular/core/testing';

import { ScenariosListService } from './scenarios-list.service';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { initialScenario } from '@app/core/models/scenario.models';

describe('ScenariosListService', () => {
  let service: ScenariosListService;
  let storage: GhseDataStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenariosListService);
    storage = TestBed.inject(GhseDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reload from storage', () => {
    service.scenarios$.subscribe(scenarios => expect(scenarios.length).toBe(0)).unsubscribe();
    storage.scenarios.withId('123').set(initialScenario).subscribe();

    service.reload();
    service.scenarios$.subscribe(scenarios => expect(scenarios.length).toBe(1)).unsubscribe();
  });

  it('should remove scenario from storage', () => {
    storage.scenarios.withId('123').set(initialScenario).subscribe();
    service.reload();
    service.scenarios$.subscribe(scenarios => expect(scenarios.length).toBe(1)).unsubscribe();

    service.remove('123');

    service.scenarios$.subscribe(scenarios => expect(scenarios.length).toBe(0)).unsubscribe();
    storage.scenarios.getAllIds().subscribe(data => expect(data.length).toBe(0));
  });

  it('should update order for list', () => {
    storage.scenarios
      .withId('1')
      .set({ ...initialScenario, order: 1, id: '1' })
      .subscribe();
    storage.scenarios
      .withId('2')
      .set({ ...initialScenario, order: 2, id: '2' })
      .subscribe();
    storage.scenarios
      .withId('3')
      .set({ ...initialScenario, order: 3, id: '3' })
      .subscribe();
    service.reload();

    service.setScenariosOrder(
      new Map<number, number>([
        [0, 3],
        [1, 1],
        [2, 2],
      ])
    );

    storage.scenarios
      .withId('1')
      .get()
      .subscribe(data => expect(data?.order).withContext('storage').toBe(3));
    storage.scenarios
      .withId('3')
      .get()
      .subscribe(data => expect(data?.order).withContext('storage').toBe(1));
    storage.scenarios
      .withId('2')
      .get()
      .subscribe(data => expect(data?.order).withContext('storage').toBe(2));
    service.scenarios$.subscribe(scenarios => {
      expect(scenarios[0].order).withContext('model').toBe(3);
      expect(scenarios[1].order).withContext('model').toBe(1);
      expect(scenarios[2].order).withContext('model').toBe(2);
    });
  });
});
