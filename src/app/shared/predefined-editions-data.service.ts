import { Injectable } from '@angular/core';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { HttpClient } from '@angular/common/http';
import { withCache } from '@ngneat/cashew';
import { EditionData } from '@ghs/game/model/data/EditionData';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { A } from '@angular/cdk/keycodes';

type LabelData = { en: { edition: { [key: string]: string } } };

@Injectable({
  providedIn: 'root',
})
export class PredefinedEditionsDataService {
  constructor(private readonly http: HttpClient) {}

  getAvailableEditions(): Observable<AvailableEdition[]> {
    return this.http
      .get<string[]>('/assets/json/predefined-editions.json', {
        context: withCache({ ttl: 86_400_000 }),
      })
      .pipe(
        mergeMap((data) => {
          return forkJoin(
            data.map((edition) => {
              return this.http.get<LabelData>(
                `/assets/json/ghs-data/${edition}/label.json`,
                { context: withCache() }
              );
            })
          ).pipe(
            map((data) =>
              data.map((entry) => {
                const prefix = Object.keys(entry.en.edition)[0];
                const name = entry.en.edition[prefix];
                return new AvailableEdition(name, prefix);
              })
            )
          );
        })
      );
  }
}
