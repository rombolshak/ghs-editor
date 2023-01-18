import { TestBed } from '@angular/core/testing';

import { NewScenarioStepsGuard } from './new-scenario-steps.guard';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';

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
    const result = guard.canActivateChild(
      { paramMap: convertToParamMap({ id: '42' }) } as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );
    expect(result).toBeTrue();
  });

  it('should deny non-saved scenario', () => {
    const result = guard.canActivateChild(
      { paramMap: convertToParamMap({ id: 'new' }) } as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );
    expect(result).toBeFalse();
  });
});
