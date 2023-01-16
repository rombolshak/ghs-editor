import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDetailComponent } from './scenario-detail.component';
import { SharedModule } from '@app/shared/shared.module';

describe('ScenarioDetailComponent', () => {
  let component: ScenarioDetailComponent;
  let fixture: ComponentFixture<ScenarioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioDetailComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
