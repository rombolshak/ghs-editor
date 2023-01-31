import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { GeneralScenarioInfo } from '@app/core/models/scenario.models';
import {
  buildForm,
  ScenarioDetailsBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';

@Component({
  selector: 'ghse-scenario-general-editor',
  templateUrl: './scenario-general-editor.component.html',
  styleUrls: ['./scenario-general-editor.component.less'],
  providers: [{ provide: TuiDestroyService }],
})
export class ScenarioGeneralEditorComponent extends ScenarioDetailsBaseComponent<GeneralScenarioInfo> {
  constructor(activatedRoute: ActivatedRoute, destroy$: TuiDestroyService) {
    const form = buildForm<GeneralScenarioInfo>({
      index: ['', Validators.required],
      group: [''],
      name: ['', Validators.required],
      initial: [false],
    });

    super(
      activatedRoute,
      destroy$,
      service => service.generalInfo$,
      (service, data) => service.updateGeneralInfo(data),
      form
    );
  }
}
