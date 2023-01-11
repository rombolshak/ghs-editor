import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { EditionEditorComponent } from './edition-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiCheckboxBlockModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiHintModule,
  TuiLabelModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { PredefinedEditionsDataService } from '@app/shared/predefined-editions-data.service';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { LocalDataManagerService } from '@app/shared/local-data-manager.service';
import { EditionBaseData } from '@app/shared/models/base-data';

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
      imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiLabelModule,
        TuiSvgModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiButtonModule,
        TuiCheckboxBlockModule,
        TuiTooltipModule,
        TuiHintModule,
      ],
      declarations: [EditionEditorComponent],
      providers: [
        {
          provide: PredefinedEditionsDataService,
          useClass: FakePredefinedEditionsDataService,
        },
      ],
    }).compileComponents();

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
    expect(component.availableEditionsIds.length).toBe(2);
  });

  it('should show selected editions', fakeAsync(() => {
    component.editionForm.controls.extendedEditions.setValue([edition1.prefix]);
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const selector = fixture.debugElement.query(
      By.css('[data-automation="edition.extendedEditions"]')
    );
    expect(selector.nativeElement.innerText).not.toContain('\n');
    expect(selector.nativeElement.innerText).toContain(edition1.toString());
    discardPeriodicTasks();
  }));

  it('should return edition conditions', () => {
    const spy = spyOn(
      editionsDataService,
      'getEditionConditions'
    ).and.callThrough();

    component.editionForm.controls.extendedEditions.setValue([edition1.prefix]);
    expect(editionsDataService.getEditionConditions).toHaveBeenCalledWith(
      edition1.prefix
    );
    expect(component.editionForm.controls.conditions.value).toEqual([
      'cond1',
      'cond2',
    ]);

    spy.calls.reset();
    component.editionForm.controls.extendedEditions.setValue([
      edition1.prefix,
      edition2.prefix,
    ]);
    expect(editionsDataService.getEditionConditions).toHaveBeenCalledWith(
      edition1.prefix
    );
    expect(editionsDataService.getEditionConditions).toHaveBeenCalledWith(
      edition2.prefix
    );
    expect(component.editionForm.controls.conditions.value).toEqual([
      'cond1',
      'cond2',
      'cond3',
    ]);

    spy.calls.reset();
    component.editionForm.controls.extendedEditions.setValue([]);
    expect(editionsDataService.getEditionConditions).not.toHaveBeenCalled();
    expect(component.editionForm.controls.conditions.value).toEqual([
      'cond1',
      'cond2',
      'cond3',
    ]);
  });

  it('should display selected conditions', fakeAsync(() => {
    component.editionForm.controls.conditions.setValue(['cond1', 'cond2']);
    fixture.detectChanges();
    const el = fixture.debugElement.query(
      By.css('[data-automation="edition.conditions"]')
    );
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

    fixture.debugElement
      .query(By.css('[data-automation="reset-button"]'))
      .triggerEventHandler('click');
    expect(component.editionForm.value.editionName).not.toBeTruthy();
    expect(component.editionForm.value.editionPrefix).not.toBeTruthy();
  });

  it('should load saved data automatically', () => {
    const localDataService = TestBed.inject(LocalDataManagerService);

    expect(component.editionForm.value.editionPrefix).toBeFalsy();
    localDataService.baseData.save({
      editionName: 'name',
      editionPrefix: 'test',
    } as EditionBaseData);
    fixture.detectChanges();
    expect(component.editionForm.value.editionPrefix).toBe('test');
    localStorage.clear();
  });
});
