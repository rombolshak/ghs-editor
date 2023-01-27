import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable, takeUntil } from 'rxjs';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};

export abstract class ScenarioDetailsBaseComponent<TDetails extends Record<string, any>> {
  protected constructor(
    activatedRoute: ActivatedRoute,
    protected readonly destroy$: TuiDestroyService,
    private readonly details$: (service: ScenarioDetailsService) => Observable<TDetails>,
    private readonly updateDetails: (service: ScenarioDetailsService, data: TDetails) => void,
    public readonly form: FormGroup<ControlsOf<TDetails>>
  ) {
    activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe(({ detailsService }) => {
      this.detailsService = detailsService;
      if (this.detailsService) {
        details$(this.detailsService).subscribe(data => {
          this.savedModel = data;
          this.reset();
        });
      }
    });
  }

  save() {
    if (this.detailsService) {
      const data = this.form.getRawValue() as TDetails;
      this.updateDetails(this.detailsService, data);
    }
  }

  public reset() {
    if (this.savedModel) {
      this.form.patchValue(this.savedModel);
    } else this.form.reset();
  }

  private detailsService: ScenarioDetailsService | undefined;
  private savedModel: TDetails | undefined;
}
