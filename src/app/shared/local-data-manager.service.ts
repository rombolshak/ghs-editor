import { Injectable } from '@angular/core';
import { LocalDataType } from '@app/shared/models/local-data-type';
import { EditionBaseData } from '@app/shared/models/base-data';
import { StoredData } from '@app/shared/models/stored-data';

@Injectable({
  providedIn: 'root',
})
export class LocalDataManagerService {
  public baseData: StoredData<EditionBaseData> = new StoredData(
    LocalDataType.Base,
    EditionBaseData
  );
}
