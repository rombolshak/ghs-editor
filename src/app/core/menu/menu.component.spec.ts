import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from "@angular/router/testing";
import { TuiDialogService } from "@taiga-ui/core";
import { from } from "rxjs";
import {By} from "@angular/platform-browser";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let dialogService: jasmine.SpyObj<TuiDialogService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: TuiDialogService, useValue: jasmine.createSpyObj<TuiDialogService>({open: from([])}) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(TuiDialogService) as jasmine.SpyObj<TuiDialogService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items', () => {
    expect((fixture.debugElement.queryAll(By.css('.menu-content .menu-row')).length)).toBeGreaterThan(0);
  });

  it('should have click handler on about', () => {
    const showAbout = spyOn(component, 'showAbout');
    const menu = fixture.debugElement.query(By.css('.menu-footer .menu-row'));
    expect(menu).toBeTruthy();
    menu.triggerEventHandler('click', null);
    expect(showAbout).toHaveBeenCalled();
  });

  it('should open about dialog', () => {
    component.showAbout(null, null);
    expect(dialogService.open.calls.count()).toBe(1);
  });
});
