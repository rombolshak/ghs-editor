import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScenarioDetailsService } from '@app/core/services/scenario-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';
import { initialScenario, Scenario } from '@app/core/services/models/scenario.models';

@Component({
  selector: 'ghse-scenario-detail',
  templateUrl: './scenario-detail.component.html',
  styleUrls: ['./scenario-detail.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenarioDetailComponent implements OnInit {
  constructor(
    private detailsService: ScenarioDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private destroy$: TuiDestroyService
  ) {}

  model: Scenario = initialScenario;
  get areStepsDisabled(): boolean {
    return this.model.id === '';
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detailsService.initializeWithId(id!);
    this.detailsService.scenarioDetails$?.pipe(takeUntil(this.destroy$)).subscribe(model => (this.model = model));
  }
}
