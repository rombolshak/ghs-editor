import { Injectable } from '@angular/core';
import { ModelManagerService } from '@app/core/services/model-manager.service';
import { ModelFactory } from '@app/core/services/model';

export interface ScenarioDetails {
  id: string;
  name: string;
  group: string;
}

export const initialDetails: ScenarioDetails = {
  id: 'new',
  name: 'New scenario',
  group: '',
};

@Injectable({
  providedIn: 'root',
})
export class ScenarioDetailsService extends ModelManagerService<ScenarioDetails> {
  constructor(private factory: ModelFactory<ScenarioDetails>) {
    super();
  }

  get scenarioDetails$() {
    return this.model?.data$ ?? null;
  }

  public initializeWithId(id: string) {
    this.initialize(`scenario-${id}`, this.factory.create(initialDetails));
  }
}
