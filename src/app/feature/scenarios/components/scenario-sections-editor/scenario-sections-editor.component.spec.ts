import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioSectionsEditorComponent } from './scenario-sections-editor.component';

describe('ScenarioSectionsEditorComponent', () => {
  let component: ScenarioSectionsEditorComponent;
  let fixture: ComponentFixture<ScenarioSectionsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioSectionsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenarioSectionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
