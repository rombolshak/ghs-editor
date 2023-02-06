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
  }

  ngOnInit() {
    this.monstersProvider.getAvailableMonsters().subscribe(data => {
      this.allMonsters = data;
      this.reset();
    });
  }

  allMonsters: Array<AvailableMonster> = [];
  addedMonsters: Array<AvailableMonster> = [];

  stringify: TuiStringHandler<AvailableMonster> = item => item.displayName!;
  stringifySearch: TuiStringHandler<AvailableMonster> = item => `${item.name} ${item.displayName}`;
  selectedMonster: AvailableMonster | null = null;

  isDrawExtraNeeded(monster: AvailableMonster): boolean {
    return (
      this.addedMonsters.findIndex(
        m => m.deck !== undefined && m !== monster && m.deck === monster.deck && m.edition === monster.edition
      ) !== -1
    );
  }

  addNewMonster(monster: AvailableMonster) {
    if (!monster) return;

    this.addNew();
    this.form.controls.at(0)?.patchValue({ name: monster.name });
    this.addedMonsters.unshift(monster);
    setTimeout(() => (this.selectedMonster = null), 0);
  }

  override remove(index: number) {
    this.addedMonsters.splice(index, 1);
    super.remove(index);
  }

  override reset() {
    this.addedMonsters = [];
    for (const saved of this.savedModel!) {
      const found = this.allMonsters.find(m => m.name === saved.name);
      if (found) {
        this.addedMonsters.push(found);
      } else this.addedMonsters.push({ name: saved.name, displayName: `<Unknown monster> ${saved.name}`, edition: '' });
    }

    super.reset();
  }
}
