import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioObjectivesComponent } from './scenario-objectives.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TuiInputNumberModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { TuiAlertOptions, TuiAlertService } from '@taiga-ui/core';
import { TuiIdService } from '@taiga-ui/cdk';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ScenarioObjective } from '@app/core/models/scenario.models';

describe('ScenarioObjectivesComponent', () => {
  let component: ScenarioObjectivesComponent;
  let fixture: ComponentFixture<ScenarioObjectivesComponent>;
  const storage = new GhseDataStorageService();
  const scenariosListService = new ScenariosListService(storage);
  let detailsService: ScenarioDetailsService;

  beforeEach(async () => {
    localStorage.clear();
    detailsService = new ScenarioDetailsService(
      scenariosListService,
      storage,
      new TuiAlertService({} as TuiAlertOptions<any>, new TuiIdService()),
      'test'
    );

    await TestBed.configureTestingModule({
      declarations: [ScenarioObjectivesComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        TuiRadioBlockModule,
        TuiInputNumberModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ detailsService: detailsService }) },
        },
        {
          provide: GhseDataStorageService,
          useValue: storage,
        },
        {
          provide: ScenariosListService,
          useValue: scenariosListService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioObjectivesComponent);
    component = fixture.componentInstance;
    component.reset();
    fixture.detectChanges();
    console.log(component.form);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no forms on initial', () => {
    expect(component.form.controls.length).toBe(0);
    const forms = fixture.debugElement.queryAll(By.css('.objective-form'));
    expect(forms.length).toBe(0);
  });

  it('should add and remove new form on click', () => {
    const addButton = fixture.debugElement.query(By.css('.new-buttons button'));
    expect(addButton).toBeTruthy();
    addButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.form.controls.length).toBe(1);
    let forms = fixture.debugElement.queryAll(By.css('.objective-form'));
    expect(forms.length).toBe(1);

    const removeButton = fixture.debugElement.query(By.css('tui-svg.delete'));
    expect(removeButton).toBeTruthy();
    removeButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.form.controls.length).toBe(0);
    forms = fixture.debugElement.queryAll(By.css('.objective-form'));
    expect(forms.length).toBe(0);
  });

  it('should load saved data', () => {
    detailsService.updateObjectives([{ name: 'test obj', escort: true } as ScenarioObjective]);
    component.reset();
    expect(component.form.controls.length).toBe(1);
    const obj = component.form.controls.at(0)!.getRawValue();
    expect(obj.name).toEqual('test obj');
    expect(obj.escort).toBe(true);
  });

  it('should save data', () => {
    component.addNew();
    component.form.patchValue([{ name: 'test obj', escort: true } as ScenarioObjective]);
    const spy = spyOn(detailsService, 'updateObjectives');
    component.save();
    expect(spy).toHaveBeenCalled();
  });
});
