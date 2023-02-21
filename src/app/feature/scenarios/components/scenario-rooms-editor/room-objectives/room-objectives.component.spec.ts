import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomObjectivesComponent } from './room-objectives.component';

describe('RoomObjectivesComponent', () => {
  let component: RoomObjectivesComponent;
  let fixture: ComponentFixture<RoomObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomObjectivesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
