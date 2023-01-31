import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';
import { Scenario } from '@app/core/models/scenario.models';
import { ScenarioDetailsServiceFactory } from '@app/core/services/business/scenario-details-service.factory';
import { ScenarioHelper } from '@app/core/services/business/scenario.helper';

@Component({
  selector: 'ghse-scenario-detail',
  templateUrl: './scenario-detail.component.html',
  styleUrls: ['./scenario-detail.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenarioDetailComponent implements OnInit {
  constructor(
    private readonly detailsServiceFactory: ScenarioDetailsServiceFactory,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly destroy$: TuiDestroyService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detailsService = this.detailsServiceFactory.create(id!);
    this.detailsService.fullModel$?.pipe(takeUntil(this.destroy$)).subscribe(model => (this.model = model));
  }

  get areStepsDisabled(): boolean {
    return this.model?.generalInfo.index === '';
  }

  get header(): string {
    return !this.model || this.model.generalInfo.name === '' ? 'New scenario' : ScenarioHelper.getFullName(this.model);
  }

  get generalState(): 'error' | 'normal' | 'pass' {
    return this.model?.generalInfo.index !== '' ? 'pass' : 'normal';
  }

  get propertiesState(): 'error' | 'normal' | 'pass' {
    return ((this.model?.properties.requires.length ?? 0) > 0 &&
      (this.model?.properties.requires[0].length ?? 0) > 0) ||
      (this.model?.properties.unlocks.length ?? 0) > 0 ||
      (this.model?.properties.blocks.length ?? 0) > 0
      ? 'pass'
      : 'normal';
  }

  private model: Scenario | undefined;
  private detailsService: ScenarioDetailsService | undefined;
}
