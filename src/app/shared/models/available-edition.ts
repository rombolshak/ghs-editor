export class AvailableEdition {
  constructor(public name: string, public prefix: string) {}

  public toString(): string {
    return `${this.name} (${this.prefix})`;
  }
}
