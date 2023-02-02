import { Injectable } from '@angular/core';
import { StorageEntity, StorageEntityList } from './storage-entity';
import { initialScenario, Scenario } from '@app/core/models/scenario.models';
import { BaseEditionData, initialBaseDataModel } from '@app/core/models/edition-base.models';

@Injectable({
  providedIn: 'root',
})
export class GhseDataStorageService {
  editionBaseData = new StorageEntity<BaseEditionData>(`${GhseDataStorageService.id}/base`, initialBaseDataModel);

  scenarios = new StorageEntityList<Scenario>(`${GhseDataStorageService.id}/scenarios`, initialScenario);

  private static id = 'ghse-data';
}
