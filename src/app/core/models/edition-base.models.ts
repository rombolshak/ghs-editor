export interface BaseEditionData {
  editionName: string;
  editionPrefix: string;
  extendedEditions: string[];
  conditions: string[];
}

export const initialBaseDataModel = {
  editionName: '',
  editionPrefix: '',
  extendedEditions: [],
  conditions: [],
};
