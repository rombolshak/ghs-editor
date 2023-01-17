import { TestBed } from '@angular/core/testing';

import { ScenarioDetailsService } from './scenario-details.service';

describe('ScenarioDetailsService', () => {
  let service: ScenarioDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenarioDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load initial values', done => {
    expect(service.scenarioDetails$).toBeNull();
    service.initializeWithId('test');
    expect(service.scenarioDetails$).not.toBeNull();
    service.scenarioDetails$?.subscribe(model => {
      expect(model.id).toEqual('new');
      done();
    });
  });

  it('should not save initial model to storage', done => {
    service.initializeWithId('test');
    service.scenarioDetails$?.subscribe(_ => {
      expect(localStorage.getItem('ghse-data-scenario-test')).toBeNull();
      done();
    });
  });
});
