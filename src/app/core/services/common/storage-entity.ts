import { defer, Observable, of } from 'rxjs';

export class StorageEntity<T> {
  constructor(private readonly id: string) {}
  get(): Observable<T | null> {
    return defer(() => {
      const loaded = localStorage.getItem(this.id);
      return of(loaded ? JSON.parse(loaded) : null);
    });
  }

  set(model: T): Observable<void> {
    return defer(() => of(localStorage.setItem(this.id, JSON.stringify(model))));
  }

  remove(): Observable<void> {
    return defer(() => of(localStorage.removeItem(this.id)));
  }
}

export class StorageEntityList<T> {
  constructor(private readonly id: string) {}

  getAllIds(): Observable<Array<string>> {
    return defer(() => {
      return of(
        Object.keys(localStorage)
          .filter(key => key.startsWith(this.id))
          .map(key => key.substring(this.id.length + 1))
      );
    });
  }

  withId(id: string): StorageEntity<T> {
    return new StorageEntity(`${this.id}/${id}`);
  }
}
