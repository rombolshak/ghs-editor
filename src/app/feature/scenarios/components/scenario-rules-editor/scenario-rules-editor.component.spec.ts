import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioRulesEditorComponent } from './scenario-rules-editor.component';

describe('ScenarioRulesEditorComponent', () => {
  let component: ScenarioRulesEditorComponent;
  let fixture: ComponentFixture<ScenarioRulesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioRulesEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioRulesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
