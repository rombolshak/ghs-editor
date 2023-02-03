import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDetailComponent } from './scenario-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { TuiStepperModule } from '@taiga-ui/kit';
import { RouterTestingModule } from '@angular/router/testing';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import {
  initialGeneralInfo,
  initialObjective,
  initialProperties,
  initialScenario,
} from '@app/core/models/scenario.models';
import { ScenarioDetailsServiceFactory } from '@app/core/services/business/scenario-details-service.factory';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';

describe('ScenarioDetailComponent [New Scenario]', () => {
  let component: ScenarioDetailComponent;
  let fixture: ComponentFixture<ScenarioDetailComponent>;
  let route: ActivatedRoute;
  let detailsService: ScenarioDetailsService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      declarations: [ScenarioDetailComponent],
      imports: [RouterTestingModule.withRoutes([]), SharedModule, TuiStepperModule, ScenariosServicesModule],
    }).compileComponents();

    route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('test');
    fixture = TestBed.createComponent(ScenarioDetailComponent);
    detailsService = TestBed.inject(ScenarioDetailsServiceFactory).create('test');
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get initial model', () => {
    expect(component.model).toEqual(initialScenario);
  });

  it('should display new scenario header', () => {
    const header = fixture.debugElement.query(By.css('.page-header h2')).nativeElement.innerText;
    expect(header).toBe('New scenario');
  });

  it('should display saved scenario name', () => {
    detailsService.updateGeneralInfo({ ...initialGeneralInfo, name: 'Test scenario', index: '1' });
    expect(component.header).toBe('#1: Test scenario');
  });

  it('should disable steps', () => {
    expect(component.areStepsDisabled).toBeTrue();
    const steps = fixture.debugElement.queryAll(By.css('button[tuiStep]'));
    const disabledSteps = fixture.debugElement.queryAll(By.css('button[tuiStep][disabled]'));
    expect(disabledSteps.length).toBe(steps.length - 1);
  });

  it('pass general step', () => {
    detailsService.updateGeneralInfo({ ...initialGeneralInfo, name: 'Test scenario', index: '1' });
    expect(component.generalState).toBe('pass');
  });

  it('pass properties step', () => {
    detailsService.updateProperties({ ...initialProperties, requires: [['1'], []] });
    expect(component.propertiesState).toBe('pass');
  });

  it('pass objectives step', () => {
    detailsService.updateObjectives([initialObjective]);
    expect(component.objectivesState).toBe('pass');
  });
});
