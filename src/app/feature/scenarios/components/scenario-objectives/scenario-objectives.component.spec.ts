import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioObjectivesComponent } from './scenario-objectives.component';

describe('ScenarioObjectivesComponent', () => {
  let component: ScenarioObjectivesComponent;
  let fixture: ComponentFixture<ScenarioObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioObjectivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
