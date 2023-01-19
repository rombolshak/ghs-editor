import { Injectable } from '@angular/core';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { GhseDataStorageService } from '@app/core/services/business/ghse-data-storage.service';

@Injectable({ providedIn: 'root' })
export class ScenarioDetailsServiceFactory {
  constructor(private readonly storageService: GhseDataStorageService) {}
  create(id: string) {
    if (!this.services.has(id)) {
      this.services.set(id, new ScenarioDetailsService(this.storageService, id));
    }

    return this.services.get(id) as ScenarioDetailsService;
  }

  private services = new Map<string, ScenarioDetailsService>();
}
