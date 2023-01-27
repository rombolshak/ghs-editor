import { Scenario } from '@app/core/models/scenario.models';

export class ScenarioHelper {
  static getBusinessId(scenario: Scenario): string {
    return scenario.generalInfo.group.length !== 0
      ? `${scenario.generalInfo.index}-${scenario.generalInfo.group}`
      : scenario.generalInfo.index;
  }

  static getFullName(scenario: Scenario): string {
    return `${ScenarioHelper.getBusinessId(scenario)}: ${scenario.generalInfo.name}`;
  }
}
