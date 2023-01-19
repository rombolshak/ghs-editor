import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseEditionData, initialBaseDataModel } from '@app/core/models/edition-base.models';
import { GhseDataStorageService } from '@app/core/services/business/ghse-data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseEditionDataService {
  constructor(private readonly storageService: GhseDataStorageService) {
    this._model = new BehaviorSubject<BaseEditionData>(initialBaseDataModel);
    this.baseEditionData$ = this._model.asObservable();
    this.storageService.editionBaseData.get().subscribe(data => {
      if (data != null) this._model.next(data);
    });
  }

  baseEditionData$: Observable<BaseEditionData>;

  updateFullData(data: BaseEditionData) {
    this.storageService.editionBaseData.set(data).subscribe(() => this._model.next(data));
  }

  private _model: BehaviorSubject<BaseEditionData>;
}
