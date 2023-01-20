import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { GeneralScenarioInfo } from '@app/core/models/scenario.models';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ghse-scenario-general-editor',
  templateUrl: './scenario-general-editor.component.html',
  styleUrls: ['./scenario-general-editor.component.less'],
  providers: [{ provide: TuiDestroyService }],
})
export class ScenarioGeneralEditorComponent {
  constructor(
    activatedRoute: ActivatedRoute,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly destroy$: TuiDestroyService
  ) {
    activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe(({ detailsService }) => {
      this.detailsService = detailsService;
      this.detailsService?.generalInfo$.subscribe(data => {
        this.savedModel = data;
        this.reset();
      });
    });

    activatedRoute.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(data => {
      const order = data.get('order');
      if (order) this.scenarioOrder = parseInt(order);
    });
  }

  form = this.formBuilder.group({
    index: ['', Validators.required],
    group: '',
    name: ['', Validators.required],
    initial: false,
  });

  save() {
    this.detailsService?.updateGeneralInfo(this.form.getRawValue());
    if (this.scenarioOrder) this.detailsService?.updateOrder(this.scenarioOrder);
  }

  reset() {
    if (this.savedModel) {
      this.form.patchValue(this.savedModel);
    } else this.form.reset();
  }

  private detailsService: ScenarioDetailsService | undefined;
  private savedModel: GeneralScenarioInfo | undefined;
  private scenarioOrder: number | undefined;
}
