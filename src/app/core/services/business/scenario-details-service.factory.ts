import { Injectable } from '@angular/core';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({ providedIn: 'root' })
export class ScenarioDetailsServiceFactory {
  constructor(
    private readonly storageService: GhseDataStorageService,
    private readonly alertService: TuiAlertService
  ) {}
  create(id: string): ScenarioDetailsService {
    if (!this.services.has(id)) {
      this.services.set(id, new ScenarioDetailsService(this.storageService, this.alertService, id));
    }

    return this.services.get(id) as ScenarioDetailsService;
  }

  private services = new Map<string, ScenarioDetailsService>();
}
