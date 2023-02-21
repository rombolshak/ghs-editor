import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTreasuresComponent } from './room-treasures.component';

describe('RoomTreasuresComponent', () => {
  let component: RoomTreasuresComponent;
  let fixture: ComponentFixture<RoomTreasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomTreasuresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomTreasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
