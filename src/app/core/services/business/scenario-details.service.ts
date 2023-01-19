import { GeneralScenarioInfo, initialScenario, Scenario } from '@app/core/models/scenario.models';
import { GhseDataStorageService } from '@app/core/services/business/ghse-data-storage.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

export class ScenarioDetailsService {
  constructor(private readonly storageService: GhseDataStorageService, private readonly scenarioId: string) {
    this._model = new BehaviorSubject<Scenario>(initialScenario);

    storageService.scenarios
      .withId(scenarioId)
      .get()
      .subscribe(data => {
        if (data !== null) this._model.next(data);
      });

    this.generalInfo$ = this._model.asObservable().pipe(map(model => model.generalInfo));
  }

  generalInfo$: Observable<GeneralScenarioInfo>;

  updateGeneralInfo(data: GeneralScenarioInfo) {
    const newModel = { ...this._model.value, generalInfo: data };
    this.storageService.scenarios
      .withId(this.scenarioId)
      .set(newModel)
      .subscribe(() => this._model.next(newModel));
  }

  private _model: BehaviorSubject<Scenario>;
}
