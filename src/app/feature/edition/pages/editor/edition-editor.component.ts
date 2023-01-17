import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, forkJoin, mergeMap, take, takeUntil } from 'rxjs';
import { TUI_DEFAULT_MATCHER, TuiDestroyService, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { ConditionName } from '@ghs/game/model/Condition';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiAlertService, TuiNotification, TuiValueContentContext } from '@taiga-ui/core';
import { BaseEditionData, BaseEditionDataService } from '@app/core/services/base-edition-data.service';
import {
  AvailableEdition,
  PredefinedEditionsDataService,
} from '@app/feature/edition/services/predefined-editions-data.service';

@Component({
  selector: 'ghse-editor',
  templateUrl: './edition-editor.component.html',
  styleUrls: ['./edition-editor.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditionEditorComponent implements OnInit {
  loading = new BehaviorSubject(true);
  availableEditionsIds = new BehaviorSubject(<string[]>[]);
  conditionSearch: string | null = null;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: PredefinedEditionsDataService,
    private readonly baseEditionDataService: BaseEditionDataService,
    private readonly destroy$: TuiDestroyService,
    private readonly alertService: TuiAlertService
  ) {
    this.setEditionConditionsOnExtendedEditionsChange();
  }

  ngOnInit() {
    forkJoin([this.dataService.getAvailableEditions(), this.baseEditionDataService.baseEditionData$.pipe(take(1))])
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.next(false))
      )
      .subscribe(([editions, savedFormData]) => {
        this.availableEditions = editions;
        this.availableEditionsIds.next(editions.map(e => e.prefix));

        if (savedFormData !== null) {
          this.savedFormData = savedFormData;
          this.editionForm.patchValue(savedFormData);
        }
      });
  }

  editionForm = this.formBuilder.nonNullable.group({
    editionName: ['', Validators.required],
    editionPrefix: ['', Validators.required],
    extendedEditions: [<string[]>[], Validators.required],
    conditions: [<string[]>[]],
  });

  getName: TuiStringHandler<string> = id =>
    this.availableEditions.find(e => e.prefix === id)?.toString() ?? '<unknown edition>';

  getNameForList: PolymorpheusContent<TuiValueContentContext<string>> = ({ $implicit }) => this.getName($implicit);

  @tuiPure
  filterConditions(search: string | null): readonly string[] {
    return Object.keys(ConditionName).filter(item => TUI_DEFAULT_MATCHER(item, search || ``));
  }

  save(): void {
    const model = this.editionForm.getRawValue() as BaseEditionData;
    this.baseEditionDataService.updateFullData(model);
    this.editionForm.markAsPristine();
    this.alertService.open('Data saved', { status: TuiNotification.Success }).subscribe();
    this.savedFormData = model;
  }

  reset(): void {
    if (this.savedFormData) this.editionForm.patchValue(this.savedFormData);
    else this.editionForm.reset();
    this.editionForm.markAsPristine();
  }

  private setEditionConditionsOnExtendedEditionsChange() {
    this.editionForm.controls.extendedEditions.valueChanges
      .pipe(
        mergeMap(data => {
          return forkJoin(data?.map(edition => this.dataService.getEditionConditions(edition)));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        const newConditions = data.flat();
        const distinctConditions = newConditions.filter((value, index) => newConditions.indexOf(value) === index);
        this.editionForm.controls.conditions.setValue(distinctConditions);
      });
  }

  private availableEditions: AvailableEdition[] = [];
  private savedFormData: BaseEditionData | null = null;
}
