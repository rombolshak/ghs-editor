import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionEditorComponent } from './edition-editor.component';

describe('EditorComponent', () => {
  let component: EditionEditorComponent;
  let fixture: ComponentFixture<EditionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
