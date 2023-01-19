import { GeneralScenarioInfo, initialScenario, Scenario } from '@app/core/models/scenario.models';
import { GhseDataStorageService } from '@app/core/services/business/ghse-data-storage.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

export class ScenarioDetailsService {
  constructor(
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
  }

  exists$: Observable<boolean>;

  generalInfo$: Observable<GeneralScenarioInfo>;

  updateGeneralInfo(data: GeneralScenarioInfo) {
    const newModel = { ...this._model.value, generalInfo: data };
    this.storageService.scenarios
      .withId(this.scenarioId)
      .set(newModel)
      .pipe(
        tap(() => this._model.next(newModel)),
        switchMap(() => this._dataSaved$)
      )
      .subscribe();
  }

  private _dataSaved$ = this.alertService.open('Data saved', { status: TuiNotification.Success });
  private _model: BehaviorSubject<Scenario>;
}
