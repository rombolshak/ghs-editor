import {
  GeneralScenarioInfo,
  initialScenario,
  Scenario,
  ScenarioMonster,
  ScenarioObjective,
  ScenarioProperties,
  ScenarioRoom,
} from '@app/core/models/scenario.models';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { ScenarioHelper } from '@app/core/services/business/scenario.helper';

export class ScenarioDetailsService {
  constructor(
    private readonly listService: ScenariosListService,
    private readonly storageService: GhseDataStorageService,
    private readonly alertService: TuiAlertService,
    private readonly scenarioId: string
  ) {
    this._model = new BehaviorSubject<Scenario>(initialScenario);

    this.reload();

    this.businessId$ = this._model.asObservable().pipe(map(model => ScenarioHelper.getBusinessId(model)));
    this.exists$ = this._model.asObservable().pipe(map(model => model.generalInfo.index !== ''));
    this.listService.maxOrder$.subscribe(value => (this._maxOrder = value));

    this.fullModel$ = this._model.asObservable();
    this.generalInfo$ = this._model.asObservable().pipe(map(model => model.generalInfo));
    this.properties$ = this._model.asObservable().pipe(map(model => model.properties));
    this.objectives$ = this._model.asObservable().pipe(map(model => model.objectives));
    this.monsters$ = this._model.asObservable().pipe(map(model => model.monsters));
    this.rooms$ = this._model.asObservable().pipe(map(model => model.rooms));
  }

  businessId$: Observable<string>;
  exists$: Observable<boolean>;

  fullModel$: Observable<Scenario>;
  generalInfo$: Observable<GeneralScenarioInfo>;
  properties$: Observable<ScenarioProperties>;
  objectives$: Observable<ScenarioObjective[]>;
  monsters$: Observable<ScenarioMonster[]>;
  rooms$: Observable<ScenarioRoom[]>;

  updateGeneralInfo(data: GeneralScenarioInfo) {
    const newModel = { ...this._model.value, generalInfo: data };
    if (this._model.value.id === '') newModel.id = this.scenarioId;
    if (this._model.value.order === 0) newModel.order = this._maxOrder + 1;
    this.notifyUpdated(newModel);
  }

  updateProperties(data: ScenarioProperties) {
    this.notifyUpdated({ ...this._model.value, properties: data });
  }

  updateObjectives(data: ScenarioObjective[]) {
    this.notifyUpdated({ ...this._model.value, objectives: data });
  }

  updateMonsters(data: ScenarioMonster[]) {
    this.notifyUpdated({ ...this._model.value, monsters: data });
  }

  updateRooms(data: ScenarioRoom[]) {
    this.notifyUpdated({ ...this._model.value, rooms: data });
  }

  public reload() {
    this.storageService.scenarios
      .withId(this.scenarioId)
      .get()
      .subscribe(data => {
        if (data !== null) {
          this._model.next(data);
        }
      });
  }

  private notifyUpdated(newModel: Scenario) {
    this.storageService.scenarios
      .withId(this.scenarioId)
      .set(newModel)
      .pipe(
        tap(() => this._model.next(newModel)),
        tap(() => this.listService.reload()),
        switchMap(() => this._dataSaved$)
      )
      .subscribe();
  }

  private _dataSaved$ = this.alertService.open('Data saved', { status: TuiNotification.Success });
  private _model: BehaviorSubject<Scenario>;
  private _maxOrder = 0;
}
