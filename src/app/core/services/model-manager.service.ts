import { Model } from '@app/core/services/model';

export abstract class ModelManagerService<T> {
  protected constructor(private storeKey: string, protected model: Model<T>) {
    const savedData = this.loadFromStore();
    if (savedData) this.model.set(savedData);

    this.model.data$.subscribe((data) => this.saveToStore(data));
  }
  private loadFromStore(): T | null {
    const data = localStorage.getItem(`ghse-data-${this.storeKey}`);
    return data != null ? JSON.parse(data) : null;
  }
  private saveToStore(model: T): void {
    localStorage.setItem(`ghse-data-${this.storeKey}`, JSON.stringify(model));
  }
}
