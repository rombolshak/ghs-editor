import { Injectable } from '@angular/core';
import { ModelManagerService } from '@app/core/services/model-manager.service';
import { ModelFactory } from '@app/core/services/model';
import { initialScenario, Scenario } from '@app/core/services/models/scenario.models';

@Injectable({
  providedIn: 'root',
})
export class ScenarioDetailsService extends ModelManagerService<Scenario> {
  constructor(private factory: ModelFactory<Scenario>) {
    super();
    indexedDB.open('qq');
  }

  get scenarioDetails$() {
    return this.model?.data$ ?? null;
  }

  public initializeWithId(id: string) {
    this.initialize(`scenario-${id}`, this.factory.create(initialScenario));
  }
}
