import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDetailComponent } from './scenario-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { TuiStepperModule } from '@taiga-ui/kit';
import { RouterTestingModule } from '@angular/router/testing';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { By } from '@angular/platform-browser';
import { initialScenario } from '@app/core/services/models/scenario.models';

describe('ScenarioDetailComponent [New Scenario]', () => {
  let component: ScenarioDetailComponent;
  let fixture: ComponentFixture<ScenarioDetailComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let alertService: TuiAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioDetailComponent],
      imports: [RouterTestingModule.withRoutes([]), SharedModule, TuiStepperModule, ScenariosServicesModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    alertService = TestBed.inject(TuiAlertService);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('new');
    fixture = TestBed.createComponent(ScenarioDetailComponent);
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
    expect(header).toBe(initialScenario.generalInfo.name);
  });

  it('should disable steps', () => {
    expect(component.areStepsDisabled).toBeTrue();
    const steps = fixture.debugElement.queryAll(By.css('button[tuiStep]'));
    const disabledSteps = fixture.debugElement.queryAll(By.css('button[tuiStep][disabled]'));
    expect(disabledSteps.length).toBe(steps.length - 1);
  });
});
