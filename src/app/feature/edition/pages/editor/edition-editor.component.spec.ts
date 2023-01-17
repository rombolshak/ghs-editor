import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EditionEditorComponent } from './edition-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiAlertService, TuiHintModule, TuiTooltipModule } from '@taiga-ui/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BaseEditionData, BaseEditionDataService } from '@app/core/services/base-edition-data.service';
import {
  AvailableEdition,
  PredefinedEditionsDataService,
} from '@app/feature/edition/services/predefined-editions-data.service';
import { SharedModule } from '@app/shared/shared.module';

const edition1 = new AvailableEdition('Test 1', 'ed1');
const edition2 = new AvailableEdition('Test 2', 'ed2');
class FakePredefinedEditionsDataService {
  getAvailableEditions() {
    return of([edition1, edition2]);
  }

  getEditionConditions(edition: string) {
    return edition === 'ed1' ? of(['cond1', 'cond2']) : of(['cond2', 'cond3']);
  }
}

describe('EditionEditorComponent', () => {
  let component: EditionEditorComponent;
  let fixture: ComponentFixture<EditionEditorComponent>;
  let editionsDataService: PredefinedEditionsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TuiTooltipModule, TuiHintModule, SharedModule],
      declarations: [EditionEditorComponent],
      providers: [
        {
          provide: PredefinedEditionsDataService,
          useClass: FakePredefinedEditionsDataService,
        },
      ],
    }).compileComponents();

    localStorage.clear();
    editionsDataService = TestBed.inject(PredefinedEditionsDataService);
    spyOn(editionsDataService, 'getAvailableEditions').and.callThrough();

    fixture = TestBed.createComponent(EditionEditorComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request available editions', () => {
    expect(editionsDataService.getAvailableEditions).toHaveBeenCalled();
    expect(component.availableEditionsIds.value.length).toBe(2);
  });

  it('should show selected editions', fakeAsync(() => {
    component.editionForm.controls.extendedEditions.setValue([edition1.prefix]);
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const selector = fixture.debugElement.query(By.css('[data-automation="edition.extendedEditions"]'));
    expect(selector.nativeElement.innerText).not.toContain('\n');
    expect(selector.nativeElement.innerText).toContain(edition1.toString());
    discardPeriodicTasks();
  }));

  it('should return edition conditions', () => {
    const spy = spyOn(editionsDataService, 'getEditionConditions').and.callThrough();

    component.editionForm.controls.extendedEditions.setValue([edition1.prefix]);
    expect(editionsDataService.getEditionConditions).toHaveBeenCalledWith(edition1.prefix);
    expect(component.editionForm.controls.conditions.value).toEqual(['cond1', 'cond2']);

    spy.calls.reset();
    component.editionForm.controls.extendedEditions.setValue([edition1.prefix, edition2.prefix]);
    expect(editionsDataService.getEditionConditions).toHaveBeenCalledWith(edition1.prefix);
    expect(editionsDataService.getEditionConditions).toHaveBeenCalledWith(edition2.prefix);
    expect(component.editionForm.controls.conditions.value).toEqual(['cond1', 'cond2', 'cond3']);

    spy.calls.reset();
    component.editionForm.controls.extendedEditions.setValue([]);
    expect(editionsDataService.getEditionConditions).not.toHaveBeenCalled();
    expect(component.editionForm.controls.conditions.value).toEqual(['cond1', 'cond2', 'cond3']);
  });

  it('should display selected conditions', fakeAsync(() => {
    component.editionForm.controls.conditions.setValue(['cond1', 'cond2']);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('[data-automation="edition.conditions"]'));
    tick(1);
    fixture.detectChanges();
    expect(el.nativeElement.innerText.trim()).toBe('cond1 \n cond2');
    discardPeriodicTasks();
  }));

  it('should filter available conditions', () => {
    const data = component.filterConditions('poison');
    expect(data.length).toBe(2);

    expect(component.filterConditions(null).length).toBeGreaterThan(6);
  });

  it('should validate reuired fields', () => {
    component.editionForm.controls.editionName.setValue('');
    expect(component.editionForm.controls.editionName.valid).toBeFalse();

    component.editionForm.controls.editionName.setValue('test');
    expect(component.editionForm.controls.editionName.valid).toBeTrue();
    expect(component.editionForm.valid).toBeFalse();

    component.editionForm.controls.editionPrefix.setValue('');
    expect(component.editionForm.controls.editionPrefix.valid).toBeFalse();

    component.editionForm.controls.editionPrefix.setValue('test');
    expect(component.editionForm.controls.editionPrefix.valid).toBeTrue();
    expect(component.editionForm.valid).toBeFalse();

    component.editionForm.controls.extendedEditions.setValue([]);
    expect(component.editionForm.controls.extendedEditions.valid).toBeFalse();

    component.editionForm.controls.extendedEditions.setValue([edition1.prefix]);
    expect(component.editionForm.controls.extendedEditions.valid).toBeTrue();
    expect(component.editionForm.valid).toBeTrue();
  });

  it('should reset form on button click', () => {
    component.editionForm.patchValue({
      editionName: '123',
      editionPrefix: 'asd',
    });

    fixture.debugElement.query(By.css('[data-automation="reset-button"]')).triggerEventHandler('click');
    expect(component.editionForm.value.editionName).not.toBeTruthy();
    expect(component.editionForm.value.editionPrefix).not.toBeTruthy();
  });

  it('should load saved data automatically', () => {
    const localDataService = TestBed.inject(BaseEditionDataService);

    expect(component.editionForm.value.editionPrefix).toBeFalsy();
    localDataService.updateFullData({
      editionName: 'name',
      editionPrefix: 'test',
    } as BaseEditionData);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.editionForm.value.editionPrefix).toBe('test');
    localStorage.clear();
  });

  it('should save model to local data', () => {
    const alertService = TestBed.inject(TuiAlertService);

    const alertSpy = spyOn(alertService, 'open').and.returnValue(of(''));
    component.editionForm.setValue({
      editionName: 'qwf',
      editionPrefix: 'ars',
      extendedEditions: ['zxc'],
      conditions: ['wfp'],
    });
    component.save();
    expect(localStorage.getItem('ghse-data-base')).toBeTruthy();
    expect(alertSpy).toHaveBeenCalled();
    expect(component.editionForm.touched).toBeFalse();
    expect(component.editionForm.valid).toBeTrue();
    localStorage.clear();
  });
});
