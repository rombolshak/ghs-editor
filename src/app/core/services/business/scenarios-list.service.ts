import { Injectable } from '@angular/core';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { Scenario } from '@app/core/models/scenario.models';

@Injectable({
  providedIn: 'root',
})
export class ScenariosListService {
  constructor(private readonly storage: GhseDataStorageService) {
    this._model = new BehaviorSubject<Array<Scenario>>([]);
    this.scenarios$ = this._model.asObservable();
    this.maxOrder$ = this._model.pipe(map(model => Math.max(...model.map(s => s.order), 0)));
    this.reload();
  }

  scenarios$: Observable<Array<Scenario>>;

  maxOrder$: Observable<number>;

  reload() {
    console.log('reload list');
    this.storage.scenarios
      .getAllIds()
      .pipe(switchMap(ids => forkJoin(ids.map(id => this.storage.scenarios.withId(id).get()))))
      .subscribe(data => {
        console.log(`loaded ${data.length} scenarios`);
        this._model.next(data.filter(s => s !== null).map<Scenario>(s => s!));
      });
  }

  setScenariosOrder(order: Map<number, number>): void {
    const scenariosCopy = Array.from(this._model.value);
    order.forEach((order, id) => {
      const newScenarioModel = { ...this._model.value.at(id), order: order } as Scenario;
      this.storage.scenarios.withId(newScenarioModel.id).set(newScenarioModel).subscribe();
      scenariosCopy.at(id)!.order = order;
    });

    this._model.next(scenariosCopy);
  }

  private _model: BehaviorSubject<Array<Scenario>>;

  remove(id: string) {
    this.storage.scenarios.withId(id).remove().subscribe();
    const scenariosCopy = Array.from(this._model.value);
    const toRemove = scenariosCopy.findIndex(s => s.id === id);
    scenariosCopy.splice(toRemove, 1);
    this._model.next(scenariosCopy);
  }
}
