import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioMonstersEditorComponent } from './scenario-monsters-editor.component';

describe('ScenarioMonstersEditorComponent', () => {
  let component: ScenarioMonstersEditorComponent;
  let fixture: ComponentFixture<ScenarioMonstersEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioMonstersEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioMonstersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
