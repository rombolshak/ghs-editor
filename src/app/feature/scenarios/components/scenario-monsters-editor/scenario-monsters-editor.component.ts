import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiDestroyService, TuiStringHandler } from '@taiga-ui/cdk';
import {
  buildForm,
  ScenarioDetailsListBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';
import { ScenarioMonster } from '@app/core/models/scenario.models';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ghse-scenario-monsters-editor',
  templateUrl: './scenario-monsters-editor.component.html',
  styleUrls: ['./scenario-monsters-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ScenarioMonstersEditorComponent extends ScenarioDetailsListBaseComponent<ScenarioMonster> {
  constructor(activatedRoute: ActivatedRoute, destroy$: TuiDestroyService) {
    super(
      activatedRoute,
      destroy$,
      service => service.monsters$,
      (service, data) => service.updateMonsters(data),
      () =>
        buildForm({
          name: ['', Validators.required],
          levelAdjustment: [0],
          isAlly: [false],
          drawExtra: [false],
        })
    );
    this.reset();
  }

  monsters = ['qwe', 'asd', 'zxc'];
  stringify: TuiStringHandler<string> = item => item;
  selectedMonster: string | null = null;

  addNewMonster(monster: string) {
    if (!monster) return;

    this.addNew();
    this.form.controls.at(0)?.patchValue({ name: monster });
    setTimeout(() => (this.selectedMonster = null), 0);
  }
}
