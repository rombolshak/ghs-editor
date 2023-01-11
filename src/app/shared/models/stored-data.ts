import { LocalDataType } from '@app/shared/models/local-data-type';
import { BehaviorSubject, Observable } from 'rxjs';

export class StoredData<T> {
  constructor(
    private type: LocalDataType,
    private typeCreator: { new (instance: T): T }
  ) {}
  public save(value: T | null) {
    localStorage.setItem(this.getKey(this.type), JSON.stringify(value));
    this.subject$.next(value);
  }

  public get(): Observable<T | null> {
    if (!this._isLoaded) {
      this.subject$.next(this.loadFromStore());
    }

    return this.subject$;
  }

  private loadFromStore() {
    const data = localStorage.getItem(this.getKey(this.type));
    return data !== null ? new this.typeCreator(JSON.parse(data)) : null;
  }

  private getKey(type: LocalDataType) {
    return `ghse-data-${type.toString()}`;
  }

  private _isLoaded = false;
  private subject$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(
    null
  );
}
