import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InteractionLoaderService {
  constructor() {
    this.isLocked$ = this._locks.asObservable().pipe(map(locks => locks.length !== 0));
  }

  addBlock(name: string) {
    this._locks.next([...this._locks.value, name]);
  }

  releaseBlock(name: string) {
    const lock = this._locks.value.findIndex(l => l === name);
    if (lock !== -1) this._locks.next([...this._locks.value.slice(0, lock), ...this._locks.value.slice(lock + 1)]);
  }

  isLocked$: Observable<boolean>;

  private _locks = new BehaviorSubject<string[]>([]);
}
