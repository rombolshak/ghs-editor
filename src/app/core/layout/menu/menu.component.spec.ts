import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiDialogService } from '@taiga-ui/core';
import { from } from 'rxjs';
import { By } from '@angular/platform-browser';
import {
  AfterContentInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  template:
    '<ng-container *ngTemplateOutlet="modal"></ng-container> <ghse-menu></ghse-menu>',
})
class WrapperComponent implements AfterContentInit {
  @ViewChild(MenuComponent, { static: true }) componentRef!: MenuComponent;
  modal!: TemplateRef<any>;
  ngAfterContentInit() {
    this.modal = this.componentRef.aboutDialogContent;
  }
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let dialogService: jasmine.SpyObj<TuiDialogService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperComponent, MenuComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: TuiDialogService,
          useValue: jasmine.createSpyObj<TuiDialogService>({ open: from([]) }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.debugElement.componentInstance.componentRef;
    dialogService = TestBed.inject(
      TuiDialogService
    ) as jasmine.SpyObj<TuiDialogService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menu items', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.menu-content .menu-row')).length
    ).toBeGreaterThan(0);
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

  it('should show app versions', () => {
    const dialogText = fixture.debugElement.query(By.css('.about-content'))
      .nativeElement.innerText;
    expect(dialogText).toContain(component.appVersion);
    expect(dialogText).toContain(component.ghsVersion);
  });
});
