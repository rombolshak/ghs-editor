import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { withCache } from '@ngneat/cashew';
import { BaseEditionDataService } from '@app/core/services/business/base-edition-data.service';

type LabelData = {
  en: {
    edition: { [key: string]: string };
    monster: { [name: string]: string };
  };
};

@Injectable({
  providedIn: 'root',
})
export class LocalizationLabelService {
  constructor(editionService: BaseEditionDataService, private readonly http: HttpClient) {
    editionService.baseEditionData$
      .pipe(
        map(data => data.extendedEditions),
        switchMap(editions => forkJoin(editions.map(edition => this.loadEditionLabel(edition))))
      )
      .subscribe(data => {
        this._labels = new Map(data.map(label => [Object.keys(label.en.edition)[0], label]));
      });
  }

  getMonster(edition: string, name: string): string {
    return this._labels.get(edition)?.en.monster[name] ?? '';
  }

  private loadEditionLabel(edition: string): Observable<LabelData> {
    return this.http.get<LabelData>(`assets/json/ghs-data/${edition}/label.json`, { context: withCache() });
  }

  private _labels!: Map<string, LabelData>;
}
