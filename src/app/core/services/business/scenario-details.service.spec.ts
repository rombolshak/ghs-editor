import { TestBed } from '@angular/core/testing';

import { ScenarioDetailsService } from './scenario-details.service';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { initialScenario } from '@app/core/models/scenario.models';
import { TuiAlertService } from '@taiga-ui/core';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';

describe('ScenarioDetailsService', () => {
  let service: ScenarioDetailsService;
  let listService: ScenariosListService;
  let storageService: GhseDataStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    storageService = TestBed.inject(GhseDataStorageService);
    listService = TestBed.inject(ScenariosListService);

    service = new ScenarioDetailsService(listService, storageService, TestBed.inject(TuiAlertService), 'test');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial values', done => {
    expect(service.generalInfo$).not.toBeNull();
    service.generalInfo$?.subscribe(model => {
      expect(model.index).toEqual('');
      done();
    });
  });

  it('should not save initial model to storage', done => {
    service.generalInfo$?.subscribe(() => {
      expect(localStorage.getItem('ghse-data/scenarios/test')).toBeNull();
      done();
    });
  });

  it('should save updates model to storage', done => {
    const data = { ...initialScenario.generalInfo, index: '123' };
    service.updateGeneralInfo(data);
    service.generalInfo$?.subscribe(model => {
      expect(localStorage.getItem('ghse-data/scenarios/test')).toBeTruthy();
      expect(model).toEqual(data);
      done();
    });
  });

  it('should set id and order for new scenario', () => {
    const data = { ...initialScenario.generalInfo, index: '123' };
    storageService.scenarios
      .withId('pre1')
      .set({ ...initialScenario, id: 'pre1', order: 3 })
      .subscribe();
    storageService.scenarios
      .withId('pre2')
      .set({ ...initialScenario, id: 'pre2', order: 1 })
      .subscribe();
    storageService.scenarios
      .withId('pre3')
      .set({ ...initialScenario, id: 'pre3', order: 5 })
      .subscribe();
    listService.reload();
    listService.maxOrder$.subscribe(value => expect(value).toBe(5)).unsubscribe();

    const reloadSpy = spyOn(listService, 'reload').and.callThrough();
    service.updateGeneralInfo(data);

    expect(reloadSpy).toHaveBeenCalled();
    listService.maxOrder$.subscribe(value => expect(value).toBe(6)).unsubscribe();
    listService.scenarios$
      .subscribe(scenarios => {
        expect(scenarios.length).toBe(4);
        const s = scenarios.find(s => s.id === 'test');
        expect(s).toBeDefined();
        expect(s?.order).toBe(6);
        expect(s?.id).toBe('test');
      })
      .unsubscribe();
  });
});
