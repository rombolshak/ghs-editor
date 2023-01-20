import { Injectable } from '@angular/core';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { BehaviorSubject, forkJoin, Observable, switchMap } from 'rxjs';
import { Scenario } from '@app/core/models/scenario.models';
import { ScenarioDetailsServiceFactory } from '@app/core/services/business/scenario-details-service.factory';

@Injectable({
  providedIn: 'root',
})
export class ScenariosListService {
  constructor(
    private readonly storage: GhseDataStorageService,
    private readonly detailsFactory: ScenarioDetailsServiceFactory
  ) {
    this._model = new BehaviorSubject<Array<Scenario>>([]);
    this.storage.scenarios
      .getAllIds()
      .pipe(switchMap(ids => forkJoin(ids.map(id => this.storage.scenarios.withId(id).get()))))
      .subscribe(data => {
        this._model.next(data.filter(s => s !== null).map<Scenario>(s => s!));
      });

    this.scenarios$ = this._model.asObservable();
  }

  scenarios$: Observable<Array<Scenario>>;

  setScenariosOrder(order: Map<string, number>): void {
    order.forEach((order, id) => {
      this.detailsFactory.create(id).updateOrder(order);
    });
    this._model.next(this._model.value);
  }

  private _model: BehaviorSubject<Array<Scenario>>;
}
