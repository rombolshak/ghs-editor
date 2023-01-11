import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PredefinedEditionsDataService } from '@app/shared/predefined-editions-data.service';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { forkJoin, mergeMap, takeUntil } from 'rxjs';
import {
  TUI_DEFAULT_MATCHER,
  TuiDestroyService,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import { ConditionName } from '@ghs/game/model/Condition';
import { LocalDataManagerService } from '@app/shared/local-data-manager.service';
import { EditionBaseData } from '@app/shared/models/base-data';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiValueContentContext } from '@taiga-ui/core';

@Component({
  selector: 'app-editor',
  templateUrl: './edition-editor.component.html',
  styleUrls: ['./edition-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class EditionEditorComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: PredefinedEditionsDataService,
    private readonly localDataService: LocalDataManagerService,
    private readonly destroy$: TuiDestroyService
  ) {
    this.setEditionConditionsOnExtendedEditionsChange();
  }

  ngOnInit() {
    this.dataService
      .getAvailableEditions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.availableEditions = data;
        this.availableEditionsIds = data.map((e) => e.prefix);
      });

    this.localDataService.baseData
      .get()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data !== null) {
          this.editionForm.patchValue(data);
        }
      });
  }

  editionForm = this.formBuilder.nonNullable.group({
    editionName: ['', Validators.required],
    editionPrefix: ['', Validators.required],
    extendedEditions: [<string[]>[], Validators.required],
    conditions: [<string[]>[]],
  });

  availableEditionsIds: string[] = [];

  conditionSearch: string | null = null;

  getName: TuiStringHandler<string> = (id) =>
    this.availableEditions.find((e) => e.prefix === id)!.toString();

  getNameForList: PolymorpheusContent<TuiValueContentContext<string>> = ({
    $implicit,
  }) => this.getName($implicit);

  @tuiPure
  filterConditions(search: string | null): readonly string[] {
    return Object.keys(ConditionName).filter((item) =>
      TUI_DEFAULT_MATCHER(item, search || ``)
    );
  }

  save(): void {
    const model = this.editionForm.getRawValue() as EditionBaseData;
    this.localDataService.baseData.save(model);
  }

  private setEditionConditionsOnExtendedEditionsChange() {
    this.editionForm.controls.extendedEditions.valueChanges
      .pipe(
        mergeMap((data) => {
          return forkJoin(
            data?.map((edition) =>
              this.dataService.getEditionConditions(edition)
            )
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        const newConditions = data.flat();
        const distinctConditions = newConditions.filter(
          (value, index) => newConditions.indexOf(value) === index
        );
        this.editionForm.controls.conditions.setValue(distinctConditions);
      });
  }

  private availableEditions: AvailableEdition[] = [];
}
