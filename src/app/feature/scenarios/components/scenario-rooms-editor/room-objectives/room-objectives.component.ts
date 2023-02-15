import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, Optional, Self } from '@angular/core';
import { AbstractTuiControl, tuiDefaultProp } from '@taiga-ui/cdk';
import { RoomObjective, ScenarioObjective } from '@app/core/models/scenario.models';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'ghse-room-objectives',
  templateUrl: './room-objectives.component.html',
  styleUrls: ['./room-objectives.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomObjectivesComponent extends AbstractTuiControl<RoomObjective[]> {
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
  scenarioObjectives: ScenarioObjective[] | null = [];

  focused = false;

  getControl(scenarioObjectiveIndex: number): RoomObjective {
    let found = this.value.at(scenarioObjectiveIndex);
    if (!found) {
      found = {
        id: scenarioObjectiveIndex,
        count: this.scenarioObjectives?.at(scenarioObjectiveIndex)?.count ?? '',
      } satisfies RoomObjective;
      this.updateValue([...this.value, found]);
    }

    return found;
  }

  protected getFallbackValue(): RoomObjective[] {
    return [];
  }
}
