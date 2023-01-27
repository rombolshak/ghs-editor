import { ObjectiveData } from '@ghs/game/model/data/ObjectiveData';
import { RoomData } from '@ghs/game/model/data/RoomData';
import { ScenarioRule } from '@ghs/game/model/data/ScenarioRule';
import { LootDeckConfig } from '@ghs/game/model/Loot';

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

export interface ScenarioMonsters {
  monsters: string[];
  allies: string[];

  drawExtra: string[]; // if two bosses in one scenario, each needs his own card from boss deck

  allyDeck: boolean; // use separate deck for monster allies
}

export interface ScenarioRooms {
  rooms: RoomData[];
  marker: string;
}

export interface SpecialRules {
  rules: ScenarioRule[];
}

export interface Section {
  parent: string | undefined;
  parentSections: string[];
  resetRound: boolean;
}

export interface ScenarioProperties {
  unlocks: string[];
  blocks: string[];
  requires: string[][];
  lootDeckConfig: LootDeckConfig;
  objectives: ObjectiveData[];
}

export const initialGeneralInfo: GeneralScenarioInfo = {
  index: '',
  name: '',
  group: '',
  initial: false,
};

export const initialScenario: Scenario = {
  id: '',
  order: 0,
  generalInfo: initialGeneralInfo,
};
