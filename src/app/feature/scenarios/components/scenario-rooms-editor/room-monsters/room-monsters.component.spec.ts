import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMonstersComponent } from './room-monsters.component';

describe('RoomMonstersComponent', () => {
  let component: RoomMonstersComponent;
  let fixture: ComponentFixture<RoomMonstersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomMonstersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
