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
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { PredefinedEditionsDataService } from '@app/shared/predefined-editions-data.service';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EditorComponent', () => {
  let component: EditionEditorComponent;
  let fixture: ComponentFixture<EditionEditorComponent>;
  const editionsDataService: jasmine.SpyObj<PredefinedEditionsDataService> =
    jasmine.createSpyObj<PredefinedEditionsDataService>(
      'PredefinedEditionsDataService',
      {
        getAvailableEditions: of([
          new AvailableEdition('ed1', 'Edition 1'),
          new AvailableEdition('ed2', 'Edition 2'),
          new AvailableEdition('ed3', 'Edition 3'),
        ]),
      }
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
      ],
      declarations: [EditionEditorComponent],
      providers: [
        {
          provide: PredefinedEditionsDataService,
          useValue: editionsDataService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request available editions', () => {
    expect(editionsDataService.getAvailableEditions).toHaveBeenCalled();
  });

  it('should show selected editions', fakeAsync(() => {
    const availableEdition = new AvailableEdition('ed2', 'Edition 2');
    component.editionForm.controls.extendedEditions.setValue([
      availableEdition,
    ]);
    fixture.detectChanges();
    tick(1);
    fixture.detectChanges();
    const selector = fixture.debugElement.query(
      By.css('[data-automation="edition.extendedEditions"]')
    );
    expect(selector.nativeElement.innerText).not.toContain('\n');
    expect(selector.nativeElement.innerText).toContain(
      availableEdition.toString()
    );
    discardPeriodicTasks();
  }));
});
