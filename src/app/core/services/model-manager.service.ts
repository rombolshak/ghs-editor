import { Model } from '@app/core/services/model';

export abstract class ModelManagerService<T> {
  protected model: Model<T> | null = null;
  protected initialize(storeKey: string, model: Model<T>) {
    this.storeKey = storeKey;
    const savedData = this.loadFromStore();
    if (savedData) model.set(savedData);

    model.data$.subscribe(data => this.saveToStore(data));
    this.model = model;
  }
  private loadFromStore(): T | null {
    const data = localStorage.getItem(`ghse-data-${this.storeKey}`);
    return data != null ? JSON.parse(data) : null;
  }
  private saveToStore(model: T): void {
    localStorage.setItem(`ghse-data-${this.storeKey}`, JSON.stringify(model));
  }

  private storeKey = '';
}
