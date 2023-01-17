import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioRoomsEditorComponent } from './scenario-rooms-editor.component';

describe('ScenarioRoomsEditorComponent', () => {
  let component: ScenarioRoomsEditorComponent;
  let fixture: ComponentFixture<ScenarioRoomsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioRoomsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioRoomsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
