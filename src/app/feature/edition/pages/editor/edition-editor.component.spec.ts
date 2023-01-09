import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

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
import { HttpClient } from '@angular/common/http';

describe('EditorComponent', () => {
  let component: EditionEditorComponent;
  let fixture: ComponentFixture<EditionEditorComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiMultiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        HttpClientTestingModule,
      ],
      declarations: [EditionEditorComponent],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
