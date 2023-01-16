import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosListComponent } from './scenarios-list.component';
import { SharedModule } from '@app/shared/shared.module';

describe('ScenariosListComponent', () => {
  let component: ScenariosListComponent;
  let fixture: ComponentFixture<ScenariosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenariosListComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
