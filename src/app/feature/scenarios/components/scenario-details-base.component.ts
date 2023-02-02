/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormControlState, FormGroup, ValidatorFn } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable, takeUntil } from 'rxjs';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Array<Array<infer A>> ? FormArray<FormControl<A[]>> : FormControl<T[K]>;
};

export type GroupConfig<T> = {
  [K in keyof T]: ControlConfig<T, K>;
};

export type ControlConfig<T, K extends keyof T> = readonly [
  initialValue: T[K] | FormControlState<T[K]> | null,
  validators?: ValidatorFn | ValidatorFn[]
];

type DetailsListForm<TDetails extends Array<TInstance>, TInstance extends Record<string, any>> = FormArray<
  FormGroup<ControlsOf<TInstance>>
>;
type DetailsSingleForm<TDetails extends Record<string, any>> = FormGroup<ControlsOf<TDetails>>;

type DetailsFormType<TDetails extends Record<string, any> | Array<Record<string, any>>> = TDetails extends Array<
  infer TInstance extends Record<string, any>
>
  ? DetailsListForm<TDetails, TInstance>
  : DetailsSingleForm<TDetails>;

export function buildForm<T extends Record<any, any>>(config: GroupConfig<T>): FormGroup<ControlsOf<T>> {
  return new FormGroup(
    Object.entries(config).reduce(
      (acc, [key, [value, validators]]: [keyof T, ControlConfig<T, keyof T>]) => ({
        ...acc,
        [key]: new FormControl(value, { validators, nonNullable: value !== null }),
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
    public readonly form: DetailsFormType<TDetails>
  ) {
    activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe(({ detailsService }) => {
      this.detailsService = detailsService;
      if (this.detailsService) {
        this.detailsService.businessId$.subscribe(data => (this.currentScenarioId = data));
        details$(this.detailsService).subscribe(data => {
          this.savedModel = data;
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

  protected savedModel: TDetails | undefined;
  protected detailsService: ScenarioDetailsService | undefined;
}

export class ScenarioDetailsListBaseComponent<
  TInstance extends Record<string, any>
> extends ScenarioDetailsBaseComponent<TInstance[]> {
  constructor(
    activatedRoute: ActivatedRoute,
    destroy$: TuiDestroyService,
    details$: (service: ScenarioDetailsService) => Observable<TInstance[]>,
    updateDetails: (service: ScenarioDetailsService, data: TInstance[]) => void,
    private readonly instanceFormCreator: () => FormGroup<ControlsOf<TInstance>>
  ) {
    const form = new FormArray<FormGroup<ControlsOf<TInstance>>>([]);
    super(activatedRoute, destroy$, details$, updateDetails, form);
  }

  public addNew() {
    this.form.push(this.instanceFormCreator());
  }

  public remove(index: number) {
    this.form.removeAt(index);
  }

  public override reset() {
    if (this.savedModel) {
      this.form.clear();
      for (const data of this.savedModel) {
        const control = this.instanceFormCreator();
        control.patchValue(data);
        this.form.push(control);
      }
    } else this.form.reset();
  }
}
