import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioPropertiesEditorComponent } from './scenario-properties-editor.component';

describe('ScenarioPropertiesEditorComponent', () => {
  let component: ScenarioPropertiesEditorComponent;
  let fixture: ComponentFixture<ScenarioPropertiesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioPropertiesEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioPropertiesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
