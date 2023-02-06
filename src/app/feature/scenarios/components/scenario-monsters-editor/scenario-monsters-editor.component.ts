import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiDestroyService, TuiStringHandler } from '@taiga-ui/cdk';
import {
  buildForm,
  ScenarioDetailsListBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';
import { ScenarioMonster } from '@app/core/models/scenario.models';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { AvailableMonster, MonstersProviderService } from '@app/feature/scenarios/services/monsters-provider.service';

@Component({
  selector: 'ghse-scenario-monsters-editor',
  templateUrl: './scenario-monsters-editor.component.html',
  styleUrls: ['./scenario-monsters-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class ScenarioMonstersEditorComponent
  extends ScenarioDetailsListBaseComponent<ScenarioMonster>
  implements OnInit
{
  constructor(
    activatedRoute: ActivatedRoute,
    destroy$: TuiDestroyService,
    private readonly monstersProvider: MonstersProviderService
  ) {
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

  ngOnInit() {
    this.monstersProvider.getAvailableMonsters().subscribe(data => (this.monsters = data));
  }

  monsters: Array<AvailableMonster> = [];
  stringify: TuiStringHandler<AvailableMonster> = item => item.displayName!;
  stringifySearch: TuiStringHandler<AvailableMonster> = item => `${item.name} ${item.displayName}`;
  selectedMonster: AvailableMonster | null = null;

  addNewMonster(monster: AvailableMonster) {
    if (!monster) return;

    this.addNew();
    this.form.controls.at(0)?.patchValue({ name: monster.name });
    setTimeout(() => (this.selectedMonster = null), 0);
  }
}
