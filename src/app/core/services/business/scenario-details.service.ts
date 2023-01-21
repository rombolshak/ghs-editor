import { GeneralScenarioInfo, initialScenario, Scenario } from '@app/core/models/scenario.models';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';

export class ScenarioDetailsService {
  constructor(
    private readonly listService: ScenariosListService,
    private readonly storageService: GhseDataStorageService,
    private readonly alertService: TuiAlertService,
    private readonly scenarioId: string
  ) {
    this._model = new BehaviorSubject<Scenario>(initialScenario);

    storageService.scenarios
      .withId(scenarioId)
      .get()
      .subscribe(data => {
        if (data !== null) {
          this._model.next(data);
        }
      });

    this.generalInfo$ = this._model.asObservable().pipe(map(model => model.generalInfo));
    this.exists$ = this._model.asObservable().pipe(map(model => model.generalInfo.index !== ''));
    this.listService.totalCount$.subscribe(value => (this._totalCount = value));
  }

  exists$: Observable<boolean>;

  generalInfo$: Observable<GeneralScenarioInfo>;

  updateGeneralInfo(data: GeneralScenarioInfo) {
    const newModel = { ...this._model.value, generalInfo: data };
    if (this._model.value.id === '') newModel.id = this.scenarioId;
    if (this._model.value.order === 0) newModel.order = this._totalCount + 1;
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

  updateOrder(newOrder: number) {
    const newModel = { ...this._model.value, order: newOrder };
    this.storageService.scenarios.withId(this.scenarioId).set(newModel).subscribe();
    console.log(`${this.scenarioId} new order ${newOrder}`);
  }

  private _dataSaved$ = this.alertService.open('Data saved', { status: TuiNotification.Success });
  private _model: BehaviorSubject<Scenario>;
  private _totalCount = 0;
}
