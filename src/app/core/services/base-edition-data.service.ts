import { Injectable } from '@angular/core';
import { ModelFactory } from '@app/core/services/model';
import { ModelManagerService } from '@app/core/services/model-manager.service';
import { Observable } from 'rxjs';

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
    super();
    this.initialize('base', factory.create(initialModel));
    this.baseEditionData$ = this.model!.data$;
  }

  baseEditionData$: Observable<BaseEditionData>;

  updateFullData(data: BaseEditionData) {
    this.model!.set(data);
  }
}
