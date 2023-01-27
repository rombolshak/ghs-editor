/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormControlState, FormGroup, ValidatorFn } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable, takeUntil } from 'rxjs';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: FormControl<T[K]>;
};

type GroupConfig<T> = {
  [K in keyof T]: ControlConfig<T, K>;
};

type ControlConfig<T, K extends keyof T> = readonly [
  initialValue: T[K] | FormControlState<T[K]>,
  validators?: ValidatorFn | ValidatorFn[]
];

export function buildForm<T extends Record<any, any>>(config: GroupConfig<T>): FormGroup<ControlsOf<T>> {
  return new FormGroup(
    Object.entries(config).reduce(
      (acc, [key, [value, validators]]: [keyof T, ControlConfig<T, keyof T>]) => ({
        ...acc,
        [key]: new FormControl(value, { validators, nonNullable: true }),
      }),
      {} as ControlsOf<T>
    )
  );
}

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
        this.detailsService.businessId$.subscribe(data => (this.currentScenarioId = data));
        details$(this.detailsService).subscribe(data => {
          this.savedModel = data;
          this.reset();
        });
      }
    });
  }

  protected currentScenarioId = '';

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
