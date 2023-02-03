import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  buildForm,
  ScenarioDetailsListBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';
import { ScenarioObjective } from '@app/core/models/scenario.models';
import { ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ghse-scenario-objectives',
  templateUrl: './scenario-objectives.component.html',
  styleUrls: ['./scenario-objectives.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenarioObjectivesComponent extends ScenarioDetailsListBaseComponent<ScenarioObjective> {
  constructor(activatedRoute: ActivatedRoute, destroy$: TuiDestroyService) {
    super(
      activatedRoute,
      destroy$,
      service => service.objectives$,
      (service, data) => service.updateObjectives(data),
      () =>
        buildForm({
          name: ['', Validators.required],
          health: [''],
          escort: [false],
          initiative: [<number | null>null, [Validators.min(1), Validators.max(99)]],
          count: [''],
          marker: ['', Validators.maxLength(1)],
        })
    );

    this.reset();
  }
}
