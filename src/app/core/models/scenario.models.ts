import { ObjectiveData } from '@ghs/game/model/data/ObjectiveData';
import { RoomData } from '@ghs/game/model/data/RoomData';
import { ScenarioRule } from '@ghs/game/model/data/ScenarioRule';
import { LootDeckConfig } from '@ghs/game/model/Loot';

export interface Scenario {
  id: string;
  order: number;

  generalInfo: GeneralScenarioInfo;
  properties: ScenarioProperties;
  objectives: ScenarioObjective[];
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
  // lootDeckConfig: LootDeckConfig;
}

export interface ScenarioObjective {
  id: number;
  marker: string;
  name: string;
  health: number | string;
  escort: boolean;
  initiative: number | undefined;
  count: number | string;
}

export const initialGeneralInfo = {
  index: '',
  name: '',
  group: '',
  initial: false,
} satisfies GeneralScenarioInfo;

export const initialProperties = {
  blocks: [],
  unlocks: [],
  requires: [],
  // lootDeckConfig: {},
} satisfies ScenarioProperties;

export const initialObjective = {
  id: 0,
  count: 0,
  escort: false,
  health: 0,
  initiative: 0,
  name: '',
  marker: '',
} satisfies ScenarioObjective;

export const initialScenario = {
  id: '',
  order: 0,
  generalInfo: initialGeneralInfo,
  properties: initialProperties,
  objectives: [],
} satisfies Scenario;
