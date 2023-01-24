import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ScenariosListComponent } from './scenarios-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TuiTilesModule } from '@taiga-ui/kit';
import { By } from '@angular/platform-browser';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { ScenarioDetailsServiceFactory } from '@app/core/services/business/scenario-details-service.factory';
import { initialGeneralInfo } from '@app/core/models/scenario.models';

describe('ScenariosListComponent', () => {
  let component: ScenariosListComponent;
  let listService: ScenariosListService;
  let detailsFactory: ScenarioDetailsServiceFactory;
  let fixture: ComponentFixture<ScenariosListComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      declarations: [ScenariosListComponent],
      imports: [SharedModule, RouterTestingModule.withRoutes([]), TuiTilesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenariosListComponent);
    listService = TestBed.inject(ScenariosListService);
    detailsFactory = TestBed.inject(ScenarioDetailsServiceFactory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no scenarios button', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
    const noItems = fixture.debugElement.queryAll(By.css('.no-items'));
    expect(noItems.length).toBe(1);

    const headerButton = fixture.debugElement.queryAll(By.css('.page-header button'));
    expect(headerButton.length).toBe(0);
  });

  it('should show new scenario button in header', () => {
    detailsFactory.create('test').updateGeneralInfo(initialGeneralInfo);
    component.ngOnInit();
    fixture.detectChanges();

    const noItems = fixture.debugElement.queryAll(By.css('.no-items'));
    expect(noItems.length).toBe(0);

    const headerButton = fixture.debugElement.queryAll(By.css('.page-header button'));
    expect(headerButton.length).toBe(1);
  });

  it('should show scenarios in order', fakeAsync(() => {
    detailsFactory.create('1').updateGeneralInfo({ ...initialGeneralInfo, index: '1' });
    detailsFactory.create('2').updateGeneralInfo({ ...initialGeneralInfo, index: '2' });
    detailsFactory.create('3').updateGeneralInfo({ ...initialGeneralInfo, index: '3' });
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.scenarios.length).toBe(3);
    const scenarios = fixture.debugElement.queryAll(By.css('tui-tile'));
    console.log(scenarios);
    expect(scenarios.length).toBe(3);
    expect(scenarios[0].styles['order']).toBe('1');
    expect(scenarios[0].nativeElement.innerText).toContain('#1:');
    expect(scenarios[1].styles['order']).toBe('3');
    expect(scenarios[1].nativeElement.innerText).toContain('#3:');
    expect(scenarios[2].styles['order']).toBe('2');
    expect(scenarios[2].nativeElement.innerText).toContain('#2:');
  }));

  it('should reorder scenarios', fakeAsync(() => {
    detailsFactory.create('1').updateGeneralInfo({ ...initialGeneralInfo, index: '1' });
    detailsFactory.create('2').updateGeneralInfo({ ...initialGeneralInfo, index: '2' });
    detailsFactory.create('3').updateGeneralInfo({ ...initialGeneralInfo, index: '3' });
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    component.reorder(
      new Map([
        [0, 3],
        [1, 1],
        [2, 2],
      ])
    );
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.scenarios.length).toBe(3);
    const scenarios = fixture.debugElement.queryAll(By.css('tui-tile'));
    console.log(scenarios);
    expect(scenarios.length).toBe(3);
    expect(scenarios[0].styles['order']).toBe('3');
    expect(scenarios[0].nativeElement.innerText).toContain('#1:');
    expect(scenarios[1].styles['order']).toBe('1');
    expect(scenarios[1].nativeElement.innerText).toContain('#3:');
    expect(scenarios[2].styles['order']).toBe('2');
    expect(scenarios[2].nativeElement.innerText).toContain('#2:');
  }));

  it('should remove scenario', fakeAsync(() => {
    detailsFactory.create('3').updateGeneralInfo({ ...initialGeneralInfo, index: '3' });
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.scenarios.length).toBe(1);
    const removeButton = fixture.debugElement.query(By.css('tui-svg.remove'));
    expect(removeButton).not.toBeNull();

    removeButton.nativeElement.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.scenarios.length).toBe(0);
  }));
});
