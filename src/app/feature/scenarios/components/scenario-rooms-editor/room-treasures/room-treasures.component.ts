import { ChangeDetectorRef, Component, Inject, Optional, Self } from '@angular/core';
import { AbstractTuiControl } from '@taiga-ui/cdk';
import { RoomTreasure } from '@app/core/models/scenario.models';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'ghse-room-treasures',
  templateUrl: './room-treasures.component.html',
  styleUrls: ['./room-treasures.component.less'],
})
export class RoomTreasuresComponent extends AbstractTuiControl<RoomTreasure[]> {
  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    control: NgControl | null,
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef
  ) {
    super(control, changeDetectorRef);
  }

  focused = false;

  addTreasure() {
    const newTreasure = { isScenarioGoal: false, treasureIndex: 0, description: '' } satisfies RoomTreasure;
    this.updateValue([...this.value, newTreasure]);
  }

  remove(i: number) {
    this.updateValue([...this.value.slice(0, i), ...this.value.slice(i + 1)]);
  }

  protected getFallbackValue(): RoomTreasure[] {
    return [];
  }
}
