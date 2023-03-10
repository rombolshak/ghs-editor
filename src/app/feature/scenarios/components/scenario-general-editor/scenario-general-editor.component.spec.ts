import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioGeneralEditorComponent } from './scenario-general-editor.component';
import { SharedModule } from '@app/shared/shared.module';
import { TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { initialGeneralInfo } from '@app/core/models/scenario.models';
import { TuiAlertOptions, TuiAlertService } from '@taiga-ui/core';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { TuiIdService } from '@taiga-ui/cdk';

describe('ScenarioGeneralEditorComponent', () => {
  let component: ScenarioGeneralEditorComponent;
  let fixture: ComponentFixture<ScenarioGeneralEditorComponent>;
  let detailsService: ScenarioDetailsService;

  beforeEach(async () => {
    const storage = new GhseDataStorageService();
    detailsService = new ScenarioDetailsService(
      new ScenariosListService(storage),
      storage,
      new TuiAlertService({} as TuiAlertOptions<any>, new TuiIdService()),
      'test'
    );
    await TestBed.configureTestingModule({
      declarations: [ScenarioGeneralEditorComponent],
      imports: [SharedModule, TuiCheckboxLabeledModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ detailsService: detailsService }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioGeneralEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.clear());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty data on new scenario', () => {
    expect(component.form.getRawValue()).toEqual(initialGeneralInfo);
  });

  it('should load saved value into form', () => {
    const data = { index: '123', name: 'ars', group: 'solo', initial: true };
    detailsService.updateGeneralInfo(data);
    component.reset();
    expect(component.form.getRawValue()).toEqual(data);
  });

  it('should save form', () => {
    const data = { index: 'qqq', name: 'zxc', initial: false, group: 'AA' };
    component.form.setValue(data);
    component.save();
    detailsService.generalInfo$.subscribe(model => expect(model).toEqual(data));
  });

  it('should reset form', () => {
    const data = { index: 'qqq', name: 'zxc', initial: false, group: 'AA' };
    component.form.setValue(data);
    component.save();
    component.form.setValue({ ...data, name: 'new name', index: '' });
    expect(component.form.valid).toBeFalse();
    component.reset();
    expect(component.form.valid).toBeTrue();
    expect(component.form.getRawValue()).toEqual(data);
  });
});
