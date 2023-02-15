import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractTuiControl, tuiDefaultProp } from '@taiga-ui/cdk';
import { initialMonsterStandee, RoomMonster, ScenarioMonster, StandeeType } from '@app/core/models/scenario.models';
import { AvailableMonster } from '@app/feature/scenarios/services/monsters-provider.service';

@Component({
  selector: 'ghse-room-monsters',
  templateUrl: './room-monsters.component.html',
  styleUrls: ['./room-monsters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomMonstersComponent extends AbstractTuiControl<RoomMonster[]> {
  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    control: NgControl | null,
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef
  ) {
    super(control, changeDetectorRef);
  }

  @Input()
  @tuiDefaultProp()
  scenarioMonsters: ScenarioMonster[] | null = [];

  @Input()
  @tuiDefaultProp()
  availableMonsters: AvailableMonster[] | null = [];

  focused = false;

  getMonsterControl(scenarioMonster: ScenarioMonster): RoomMonster {
    let found = this.value.find(m => m.name === scenarioMonster.name);
    if (!found) {
      found = {
        name: scenarioMonster.name,
        standees: [],
      } satisfies RoomMonster;
      this.updateValue([...this.value, found]);
    }

    return found;
  }

  getMonsterImageUrl(scenarioMonster: ScenarioMonster): string {
    const found = this.availableMonsters?.find(m => m.name === scenarioMonster.name);
    if (!found) return '';
    return `assets/images/ghs/monster/thumbnail/${found.edition}-${found.name}.png`;
  }

  getMonsterDisplayName(monster: ScenarioMonster) {
    const found = this.availableMonsters?.find(m => m.name === monster.name);
    if (!found) return '';
    return found.displayName;
  }

  addStandee(monster: ScenarioMonster) {
    const control = this.value.find(m => m.name === monster.name);
    const found = this.availableMonsters?.find(m => m.name === monster.name);
    if ((control?.standees.length ?? 0) < (found?.count ?? 0)) {
      control?.standees.push({ ...initialMonsterStandee });
    }
  }

  removeStandee(monster: ScenarioMonster, standee: number) {
    const control = this.value.find(m => m.name === monster.name);
    control?.standees.splice(standee, 1);
  }

  protected getFallbackValue(): RoomMonster[] {
    return [];
  }

  switchStandeeType(monster: ScenarioMonster, standeeIndex: number, playersIndex: number) {
    const control = this.value.find(m => m.name === monster.name);
    const standee = control?.standees.at(standeeIndex);
    if (standee) {
      standee[playersIndex] = this._nextStandeeType.get(standee[playersIndex])!;
    }
  }

  private _nextStandeeType = new Map<StandeeType, StandeeType>([
    ['none', 'normal'],
    ['normal', 'elite'],
    ['elite', 'boss'],
    ['boss', 'none'],
  ]);
}
