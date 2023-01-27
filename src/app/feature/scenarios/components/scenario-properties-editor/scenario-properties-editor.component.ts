import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  buildForm,
  ControlsOf,
  ScenarioDetailsBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';
import { ScenarioProperties } from '@app/core/models/scenario.models';
import { ObjectiveData } from '@ghs/game/model/data/ObjectiveData';
import { LootDeckConfig } from '@ghs/game/model/Loot';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';

type qq = ControlsOf<ScenarioProperties>;
@Component({
  selector: 'ghse-scenario-properties-editor',
  templateUrl: './scenario-properties-editor.component.html',
  styleUrls: ['./scenario-properties-editor.component.less'],
})
export class ScenarioPropertiesEditorComponent
  extends ScenarioDetailsBaseComponent<ScenarioProperties>
  implements OnInit
{
  constructor(
    activatedRoute: ActivatedRoute,
    destroy$: TuiDestroyService,
    private readonly scenariosListService: ScenariosListService
  ) {
    const form = buildForm<ScenarioProperties>({
      blocks: [[]],
      unlocks: [<string[]>[]],
      requires: [<string[][]>[]],
    });

    super(
      activatedRoute,
      destroy$,
      service => service.properties$,
      (service, data) => service.updateProperties(data),
      form
    );
  }

  ngOnInit() {
    this.scenariosListService.scenarios$;
  }
}
