export interface Scenario {
  id: string;
  order: number;

  generalInfo: GeneralScenarioInfo;
}

export interface GeneralScenarioInfo {
  index: string;
  name: string;
  group: string;
  initial: boolean;
}

export const initialGeneralInfo: GeneralScenarioInfo = {
  index: 'new',
  name: 'New scenario',
  group: '',
  initial: false,
};

export const initialScenario: Scenario = {
  id: '',
  order: 0,
  generalInfo: initialGeneralInfo,
};
