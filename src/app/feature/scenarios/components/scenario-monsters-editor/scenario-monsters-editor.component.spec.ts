import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioMonstersEditorComponent } from './scenario-monsters-editor.component';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { TuiAlertOptions, TuiAlertService, TuiGroupModule } from '@taiga-ui/core';
import { TuiIdService } from '@taiga-ui/cdk';
import { SharedModule } from '@app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  TuiCheckboxBlockModule,
  TuiComboBoxModule,
  TuiFilterByInputPipeModule,
  TuiInputCountModule,
  TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { AvailableMonster, MonstersProviderService } from '@app/feature/scenarios/services/monsters-provider.service';
import { By } from '@angular/platform-browser';

class MonsterProviderMock {
  getAvailableMonsters(): Observable<Array<AvailableMonster>> {
    return of([
      { name: 'm1', edition: 'test', displayName: 'Test monster 1', count: 6 },
      { name: 'm2', edition: 'non-test', displayName: 'Test monster 2', deck: 'shared', count: 6 },
      { name: 'm3', edition: 'test', displayName: 'Test monster 3', deck: 'shared', count: 6 },
      { name: 'm4', edition: 'test', displayName: 'Test monster 4', deck: 'shared', count: 6 },
    ]);
  }
}

describe('ScenarioMonstersEditorComponent', () => {
  let component: ScenarioMonstersEditorComponent;
  let fixture: ComponentFixture<ScenarioMonstersEditorComponent>;
  const storage = new GhseDataStorageService();
  const scenariosListService = new ScenariosListService(storage);
  let detailsService: ScenarioDetailsService;

  beforeEach(async () => {
    localStorage.clear();
    detailsService = new ScenarioDetailsService(
      scenariosListService,
      storage,
      new TuiAlertService({} as TuiAlertOptions<any>, new TuiIdService()),
      'test'
    );
    await TestBed.configureTestingModule({
      declarations: [ScenarioMonstersEditorComponent],
      imports: [
        SharedModule,
        ScenariosServicesModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        TuiComboBoxModule,
        TuiFilterByInputPipeModule,
        TuiStringifyContentPipeModule,
        TuiCheckboxBlockModule,
        TuiInputCountModule,
        TuiGroupModule,
        FormsModule,
      ],
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
        {
          provide: MonstersProviderService,
          useClass: MonsterProviderMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioMonstersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load available monsters on start', () => {
    expect(component.allMonsters.length).toBe(4);
    expect(component.addedMonsters.length).toBe(0);
  });

  it('should stringify monster model for search', () => {
    expect(component.stringify(component.allMonsters[0])).toBe('Test monster 1');
    expect(component.stringifySearch(component.allMonsters[0])).toBe('m1 Test monster 1');
  });

  it('should add new monster', () => {
    component.addNewMonster(component.allMonsters[0]);
    expect(component.addedMonsters.length).toBe(1);
    expect(component.addedMonsters[0]).toBe(component.allMonsters[0]);
    expect(component.form.controls.length).toBe(1);
    expect(component.form.controls.at(0)!.controls.name.value).toEqual('m1');
  });

  it('should not add empty monster', () => {
    component.addNewMonster(null);
    expect(component.addedMonsters.length).toBe(0);
  });

  it('should not show draw extra for one monster', () => {
    component.addNewMonster(component.allMonsters[2]);
    fixture.detectChanges();
    const monsterForms = fixture.debugElement.queryAll(By.css('.monster-form'));
    const drawExtra = fixture.debugElement.queryAll(By.css('[nativeId="drawExtra"]'));
    expect(monsterForms.length).toBe(1);
    expect(drawExtra.length).toBe(0);
  });

  it('should not show draw extra for different decks monsters', () => {
    component.addNewMonster(component.allMonsters[2]);
    component.addNewMonster(component.allMonsters[1]);
    fixture.detectChanges();
    const monsterForms = fixture.debugElement.queryAll(By.css('.monster-form'));
    const drawExtra = fixture.debugElement.queryAll(By.css('[nativeId="drawExtra"]'));
    expect(monsterForms.length).toBe(2);
    expect(drawExtra.length).toBe(0);
  });

  it('should show draw extra only for the same deck monsters', () => {
    component.addNewMonster(component.allMonsters[2]);
    component.addNewMonster(component.allMonsters[1]);
    component.addNewMonster(component.allMonsters[3]);
    fixture.detectChanges();
    const monsterForms = fixture.debugElement.queryAll(By.css('.monster-form'));
    const drawExtra = fixture.debugElement.queryAll(By.css('[nativeId="drawExtra"]'));
    expect(monsterForms.length).toBe(3);
    expect(drawExtra.length).toBe(2);
  });

  it('should calc draw extra', () => {
    component.addNewMonster(component.allMonsters[2]);
    component.addNewMonster(component.allMonsters[1]);
    component.addNewMonster(component.allMonsters[3]);
    expect(component.isDrawExtraNeeded(component.addedMonsters[0])).toBeTrue();
    expect(component.isDrawExtraNeeded(component.addedMonsters[1])).toBeFalse();
  });

  it('should load saved data', () => {
    const data = [{ name: 'm3', levelAdjustment: -1, isAlly: true, drawExtra: false }];
    detailsService.updateMonsters(data);
    component.reset();
    expect(component.form.controls.length).toBe(1);
    expect(component.addedMonsters.length).toBe(1);
    expect(component.addedMonsters[0]).toEqual(component.allMonsters[2]);
    expect(component.form.getRawValue()).toEqual(data);
  });

  it('should load unknown monster', () => {
    detailsService.updateMonsters([{ name: 'non-existent', levelAdjustment: -1, isAlly: true, drawExtra: false }]);
    component.reset();
    expect(component.form.controls.length).toBe(1);
    expect(component.addedMonsters.length).toBe(1);
    expect(component.addedMonsters[0].displayName).toEqual('<Unknown monster> non-existent');
  });

  it('should save data', () => {
    component.addNewMonster(component.allMonsters[0]);
    const spy = spyOn(detailsService, 'updateMonsters');
    component.save();
    expect(spy).toHaveBeenCalled();
  });

  it('should load unknown monster', () => {
    detailsService.updateMonsters([{ name: 'm1', levelAdjustment: -1, isAlly: true, drawExtra: false }]);
    component.reset();
    expect(component.form.controls.length).toBe(1);
    expect(component.addedMonsters.length).toBe(1);

    component.remove(0);
    expect(component.form.controls.length).toBe(0);
    expect(component.addedMonsters.length).toBe(0);
  });
});
