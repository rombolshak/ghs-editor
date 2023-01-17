import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioGeneralEditorComponent } from './scenario-general-editor.component';

describe('ScenarioGeneralEditorComponent', () => {
  let component: ScenarioGeneralEditorComponent;
  let fixture: ComponentFixture<ScenarioGeneralEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioGeneralEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioGeneralEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
