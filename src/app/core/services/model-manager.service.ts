export abstract class ModelManagerService<T> {
  protected constructor(private storeKey: string) {}
  loadFromStore(): T | null {
    const data = localStorage.getItem(`ghse-data-${this.storeKey}`);
    return data != null ? JSON.parse(data) : null;
  }
  saveToStore(model: T): void {
    localStorage.setItem(`ghse-data-${this.storeKey}`, JSON.stringify(model));
  }
}
