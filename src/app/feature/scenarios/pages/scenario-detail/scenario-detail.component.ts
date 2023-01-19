import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';
import { GeneralScenarioInfo } from '@app/core/models/scenario.models';
import { ScenarioDetailsServiceFactory } from '@app/core/services/business/scenario-details-service.factory';

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

  model: GeneralScenarioInfo | undefined;

  get areStepsDisabled(): boolean {
    return this.model?.index === '';
  }

  get header(): string {
    return !this.model || this.model.name === ''
      ? 'New scenario'
      : `#${this.model.index}${this.model.group !== '' ? '-' : ''}${this.model.group}: ${this.model.name}`;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detailsService = this.detailsServiceFactory.create(id!);
    this.detailsService.generalInfo$?.pipe(takeUntil(this.destroy$)).subscribe(model => (this.model = model));
  }

  private detailsService: ScenarioDetailsService | undefined;
}
