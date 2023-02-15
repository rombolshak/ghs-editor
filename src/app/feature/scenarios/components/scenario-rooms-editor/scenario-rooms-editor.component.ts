import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  buildForm,
  ScenarioDetailsListBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';
import { RoomMonster, RoomObjective, RoomTreasure, ScenarioRoom } from '@app/core/models/scenario.models';
import { ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { MonstersProviderService } from '@app/feature/scenarios/services/monsters-provider.service';

@Component({
  selector: 'ghse-scenario-rooms-editor',
  templateUrl: './scenario-rooms-editor.component.html',
  styleUrls: ['./scenario-rooms-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ScenarioRoomsEditorComponent extends ScenarioDetailsListBaseComponent<ScenarioRoom> {
  constructor(
    activatedRoute: ActivatedRoute,
    destroy: TuiDestroyService,
    public monstersService: MonstersProviderService
  ) {
    super(
      activatedRoute,
      destroy,
      service => service.rooms$,
      (service, data) => service.updateRooms(data),
      () =>
        buildForm({
          initial: [false],
          roomNumber: [0],
          ref: [''],
          marker: [''],
          rooms: [<number[]>[]],
          objectives: [<RoomObjective[]>[]],
          monster: [<RoomMonster[]>[]],
          treasures: [<RoomTreasure[]>[]],
        })
    );
  }

  selectedRoom = 0;

  override addNew() {
    super.addNew(true);
    const newNumber = this.form.controls.length;
    this.form.controls.at(newNumber - 1)!.controls.roomNumber.setValue(newNumber);
    this.selectedRoom = newNumber - 1;
  }
}
