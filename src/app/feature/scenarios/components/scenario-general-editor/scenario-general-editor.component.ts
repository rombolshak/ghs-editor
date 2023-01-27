import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { GeneralScenarioInfo } from '@app/core/models/scenario.models';
import { ScenarioDetailsBaseComponent } from '@app/feature/scenarios/components/scenario-details-base.component';

@Component({
  selector: 'ghse-scenario-general-editor',
  templateUrl: './scenario-general-editor.component.html',
  styleUrls: ['./scenario-general-editor.component.less'],
  providers: [{ provide: TuiDestroyService }],
})
export class ScenarioGeneralEditorComponent extends ScenarioDetailsBaseComponent<GeneralScenarioInfo> {
  constructor(activatedRoute: ActivatedRoute, formBuilder: NonNullableFormBuilder, destroy$: TuiDestroyService) {
    const form = formBuilder.group({
      index: ['', Validators.required],
      group: '',
      name: ['', Validators.required],
      initial: false,
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
