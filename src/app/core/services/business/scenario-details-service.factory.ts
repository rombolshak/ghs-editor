import { Injectable } from '@angular/core';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { GhseDataStorageService } from '@app/core/services/business/ghse-data-storage.service';

@Injectable({ providedIn: 'root' })
export class ScenarioDetailsServiceFactory {
  constructor(private readonly storageService: GhseDataStorageService) {}
  create(id: string) {
    return new ScenarioDetailsService(this.storageService, id);
  }
}
