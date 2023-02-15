import { Injectable } from '@angular/core';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';
import { BaseEditionDataService } from '@app/core/services/business/base-edition-data.service';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { withCache } from '@ngneat/cashew';
import { LocalizationLabelService } from '@app/core/services/business/localization-label.service';

export interface AvailableMonster {
  name: string;
  edition: string;
  deck?: string;
  displayName?: string;
  count: number;
}

@Injectable({
  providedIn: ScenariosServicesModule,
})
export class MonstersProviderService {
  constructor(
    editionService: BaseEditionDataService,
    private labelService: LocalizationLabelService,
    private readonly http: HttpClient
  ) {
    editionService.baseEditionData$
      .pipe(map(data => data.extendedEditions))
      .subscribe(editions => (this.editions = editions));
  }

  getAvailableMonsters(): Observable<Array<AvailableMonster>> {
    return this.http.get<AvailableMonster[]>(`assets/json/monsters.generated.json`, { context: withCache() }).pipe(
      map(monsters =>
        monsters
          .filter(monster => this.editions.includes(monster.edition))
          .map(monster => {
            monster.displayName = this.labelService.getMonster(monster.edition, monster.name);
            return monster;
          })
      )
    );
  }

  private editions!: string[];
}
