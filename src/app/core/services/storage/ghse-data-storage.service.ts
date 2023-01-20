import { Injectable } from '@angular/core';
import { StorageEntity, StorageEntityList } from './storage-entity';
import { Scenario } from '@app/core/models/scenario.models';
import { BaseEditionData } from '@app/core/models/edition-base.models';

@Injectable({
  providedIn: 'root',
})
export class GhseDataStorageService {
  editionBaseData = new StorageEntity<BaseEditionData>(`${GhseDataStorageService.id}/base`);

  scenarios = new StorageEntityList<Scenario>(`${GhseDataStorageService.id}/scenarios`);

  private static id = 'ghse-data';
}
