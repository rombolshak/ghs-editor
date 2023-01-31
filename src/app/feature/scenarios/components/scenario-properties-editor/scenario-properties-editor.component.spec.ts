import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioPropertiesEditorComponent } from './scenario-properties-editor.component';
import { TuiInputTagModule } from '@taiga-ui/kit';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { TuiAlertOptions, TuiAlertService, TuiValueContentContext } from '@taiga-ui/core';
import { TuiIdService } from '@taiga-ui/cdk';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { initialGeneralInfo, initialScenario } from '@app/core/models/scenario.models';
import { PolymorpheusHandler } from '@tinkoff/ng-polymorpheus/types/handler';

describe('ScenarioPropertiesEditorComponent', () => {
  let component: ScenarioPropertiesEditorComponent;
  let fixture: ComponentFixture<ScenarioPropertiesEditorComponent>;

  const storage = new GhseDataStorageService();
  const scenariosListService = new ScenariosListService(storage);
  const detailsService = new ScenarioDetailsService(
    scenariosListService,
    storage,
    new TuiAlertService({} as TuiAlertOptions<any>, new TuiIdService()),
    'test'
  );

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      declarations: [ScenarioPropertiesEditorComponent],
      imports: [SharedModule, TuiInputTagModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ detailsService: detailsService }) },
        },
        {
          provide: GhseDataStorageService,
          useValue: storage,
        },
        {
          provide: ScenariosListService,
          useValue: scenariosListService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioPropertiesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load scenarios list', () => {
    storage.scenarios
      .withId('1')
      .set({ ...initialScenario, generalInfo: { ...initialGeneralInfo, name: 'First', index: '1' } })
      .subscribe();
    storage.scenarios
      .withId('2')
      .set({ ...initialScenario, generalInfo: { ...initialGeneralInfo, name: 'Second', index: '2' } })
      .subscribe();
    storage.scenarios
      .withId('3')
      .set({ ...initialScenario, generalInfo: { ...initialGeneralInfo, name: 'Third', index: '3' } })
      .subscribe();
    scenariosListService.reload();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.scenariosIds).not.toBeNull();
    expect(component.scenariosIds?.length).toBe(3);
  });

  it('should search scenarios', () => {
    storage.scenarios
      .withId('1')
      .set({ ...initialScenario, generalInfo: { ...initialGeneralInfo, name: 'First', index: '1' } })
      .subscribe();
    storage.scenarios
      .withId('2')
      .set({ ...initialScenario, generalInfo: { ...initialGeneralInfo, name: 'Second', index: '2' } })
      .subscribe();
    storage.scenarios
      .withId('3')
      .set({ ...initialScenario, generalInfo: { ...initialGeneralInfo, name: 'Third', index: '3' } })
      .subscribe();
    scenariosListService.reload();
    component.ngOnInit();
    fixture.detectChanges();

    let search = false;
    component.filteredItems$?.subscribe(items => {
      if (!search) {
        expect(items?.length).toBe(3);
      } else {
        expect(items?.length).toBe(1);
        expect(items![0]).toEqual('2');
      }
    });

    search = true;
    component.onSearchChange('2');
    fixture.detectChanges();

    expect((component.scenarioName as PolymorpheusHandler<TuiValueContentContext<string>>).call).toBeDefined();
    expect(
      (component.scenarioName as PolymorpheusHandler<TuiValueContentContext<string>>)({ $implicit: '2', active: true })
    ).toEqual('#2: Second');
  });

  it('should save data', () => {
    const savedData = { blocks: [], requires: [['1']], unlocks: ['2', '3'] };
    component.form.setValue(savedData);
    expect(component.form.valid).toBeTrue();

    component.save();

    storage.scenarios
      .withId('test')
      .get()
      .subscribe(data => {
        expect(data?.properties).toEqual(savedData);
      });
  });
});
