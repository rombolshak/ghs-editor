export class EditionBaseData {
  editionName: string = '';
  editionPrefix: string = '';
  extendedEditions: string[] = [];
  conditions: string[] = [];
  newHazardousTerrain: boolean = false;

  constructor(instanceData?: Partial<EditionBaseData>) {
    if (instanceData) {
      const keys = Object.keys(this);
      for (const key of keys) {
        if (instanceData.hasOwnProperty(key)) {
          // @ts-ignore
          this[key] = instanceData[key];
        }
      }
    }
  }
}
