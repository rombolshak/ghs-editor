import { ComponentFixture, TestBed } from '@angular/core/testing';

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

describe('EditorComponent', () => {
  let component: EditionEditorComponent;
  let fixture: ComponentFixture<EditionEditorComponent>;

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
    }).compileComponents();

    fixture = TestBed.createComponent(EditionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
