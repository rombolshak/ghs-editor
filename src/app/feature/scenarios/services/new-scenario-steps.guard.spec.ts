import { TestBed } from '@angular/core/testing';

import { NewScenarioStepsGuard } from './new-scenario-steps.guard';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

describe('NewScenarioStepsGuard', () => {
  let guard: NewScenarioStepsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewScenarioStepsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow existing scenario', () => {
    localStorage.setItem('ghse-data/scenarios/42', JSON.stringify({ generalInfo: { index: '123' } }));
    const result = guard.canActivateChild(
      { paramMap: convertToParamMap({ id: '42' }) } as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );
    if (result instanceof Observable<boolean>) {
      result.subscribe(value => expect(value).toBeTrue());
    } else expect(result).toBeTrue();
    localStorage.clear();
  });

  it('should deny non-saved scenario', () => {
    const result = guard.canActivateChild(
      { paramMap: convertToParamMap({ id: '42' }) } as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );
    if (result instanceof Observable<boolean>) {
      result.subscribe(value => expect(value).toBeFalse());
    } else expect(result).toBeFalse();
  });
});
