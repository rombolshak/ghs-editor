import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  buildForm,
  ScenarioDetailsListBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';
import { ScenarioObjective } from '@app/core/models/scenario.models';
import { ActivatedRoute } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';

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
          name: [''],
          health: ['0'],
          escort: [false],
          initiative: [0],
          count: ['0'],
          id: [-1],
          marker: [''],
        })
    );
  }
}
