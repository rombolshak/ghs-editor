import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@app/core/services/model';
import { ModelManagerService } from '@app/core/services/model-manager.service';
import { Observable, tap } from 'rxjs';

export interface BaseEditionData {
  editionName: string;
  editionPrefix: string;
  extendedEditions: string[];
  conditions: string[];
}

export const initialModel = {
  editionName: '',
  editionPrefix: '',
  extendedEditions: [],
  conditions: [],
};

@Injectable({
  providedIn: 'root',
})
export class BaseEditionDataService extends ModelManagerService<BaseEditionData> {
  constructor(factory: ModelFactory<BaseEditionData>) {
    super('base');
    this._model = factory.create(this.loadFromStore() ?? initialModel);
    this.baseEditionData$ = this._model.data$.pipe(
      tap((data) => this.saveToStore(data))
    );
  }

  baseEditionData$: Observable<BaseEditionData>;

  updateFullData(data: BaseEditionData) {
    this._model.set(data);
  }

  private readonly _model: Model<BaseEditionData>;
}
