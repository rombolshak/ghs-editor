import { Injectable } from '@angular/core';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';
import { BaseEditionDataService } from '@app/core/services/business/base-edition-data.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: ScenariosServicesModule,
})
export class MonstersProviderService {
  constructor(editionService: BaseEditionDataService) {
    editionService.baseEditionData$
      .pipe(map(data => data.extendedEditions))
      .subscribe(editions => (this.editions = editions));
  }

  private editions!: string[];
}
