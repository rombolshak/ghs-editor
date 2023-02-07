import { ScenarioRule } from '@ghs/game/model/data/ScenarioRule';
import { LootDeckConfig } from '@ghs/game/model/Loot';
import { MonsterType } from '@ghs/game/model/MonsterType';

export interface Scenario {
  id: string;
  order: number;

  generalInfo: GeneralScenarioInfo;
  properties: ScenarioProperties;
  objectives: ScenarioObjective[];
  monsters: ScenarioMonster[];
}

export interface GeneralScenarioInfo {
  index: string;
  name: string;
  group: string;
  initial: boolean;
}

export interface RoomMonster {
  name: string;
  player2?: MonsterType;
  player3?: MonsterType;
  player4?: MonsterType;
}

export interface RoomTreasure {
  isScenarioGoal: boolean;
  treasureIndex: number;
}

export interface ScenarioRoom {
  roomNumber: number;
  ref: string;
  initial: boolean;
  marker: string;
  rooms: number[];
  treasures: RoomTreasure[];
  monster: RoomMonster[];
  objectives: string[]; // id:countFn e.g. "1:4" or "1:CxL+3"
}

export interface SpecialRules {
  rules: ScenarioRule[];
}

export interface Section {
  parent: string | undefined;
  parentSections: string[];
  resetRound: boolean;
  marker: string;
}

export interface ScenarioProperties {
  unlocks: string[];
  blocks: string[];
  requires: string[][];
  // lootDeckConfig: LootDeckConfig;
}

export interface ScenarioObjective {
  name: string;
  marker: string;
  health: string;
  escort: boolean;
  initiative: number;
  count: string;
}

export interface ScenarioMonster {
  name: string;
  levelAdjustment: number;
  isAlly: boolean;
  drawExtra: boolean;
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
  count: '',
  escort: false,
  health: '',
  initiative: 0,
  name: '',
  marker: '',
} satisfies ScenarioObjective;

export const initialMonster = {
  name: '',
  levelAdjustment: 0,
  isAlly: false,
  drawExtra: false,
} satisfies ScenarioMonster;

export const initialScenario = {
  id: '',
  order: 0,
  generalInfo: initialGeneralInfo,
  properties: initialProperties,
  objectives: [],
  monsters: [],
} satisfies Scenario;
