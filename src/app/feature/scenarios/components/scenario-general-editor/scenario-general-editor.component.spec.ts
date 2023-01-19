import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioGeneralEditorComponent } from './scenario-general-editor.component';
import { SharedModule } from '@app/shared/shared.module';
import { TuiCheckboxLabeledModule } from '@taiga-ui/kit';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScenarioGeneralEditorComponent', () => {
  let component: ScenarioGeneralEditorComponent;
  let fixture: ComponentFixture<ScenarioGeneralEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioGeneralEditorComponent],
      imports: [SharedModule, TuiCheckboxLabeledModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioGeneralEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
