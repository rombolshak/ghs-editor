import { TestBed } from '@angular/core/testing';

import { ScenarioDetailsService } from './scenario-details.service';
import { GhseDataStorageService } from '@app/core/services/business/ghse-data-storage.service';
import { initialScenario } from '@app/core/models/scenario.models';

describe('ScenarioDetailsService', () => {
  let service: ScenarioDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new ScenarioDetailsService(TestBed.inject(GhseDataStorageService), 'test');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial values', done => {
    expect(service.generalInfo$).not.toBeNull();
    service.generalInfo$?.subscribe(model => {
      expect(model.index).toEqual('new');
      done();
    });
  });

  it('should not save initial model to storage', done => {
    service.generalInfo$?.subscribe(_ => {
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
});
