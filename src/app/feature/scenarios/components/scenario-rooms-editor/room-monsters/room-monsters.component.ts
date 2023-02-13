import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractTuiControl, tuiDefaultProp } from '@taiga-ui/cdk';
import { RoomMonster, ScenarioMonster } from '@app/core/models/scenario.models';

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

  focused = false;

  getMonsterValue(name: string): RoomMonster {
    let found = this.value.find(m => m.name === name);
    if (!found) {
      found = {
        name: name,
        counts: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
      } satisfies RoomMonster;
      this.updateValue([...this.value, found]);
    }

    return found;
  }

  protected getFallbackValue(): RoomMonster[] {
    return [];
  }
}
