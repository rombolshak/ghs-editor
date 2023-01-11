import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PredefinedEditionsDataService } from '@app/shared/predefined-editions-data.service';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { forkJoin, mergeMap, Observable, of, takeUntil } from 'rxjs';
import {
  TUI_DEFAULT_MATCHER,
  TuiDestroyService,
  TuiIdentityMatcher,
  tuiPure,
} from '@taiga-ui/cdk';
import { ConditionName } from '@ghs/game/model/Condition';
import { LocalDataManagerService } from '@app/shared/local-data-manager.service';
import { EditionBaseData } from '@app/shared/models/base-data';

@Component({
  selector: 'app-editor',
  templateUrl: './edition-editor.component.html',
  styleUrls: ['./edition-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class EditionEditorComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: PredefinedEditionsDataService,
    private readonly localDataService: LocalDataManagerService,
    private readonly destroy$: TuiDestroyService
  ) {
    this.setEditionConditionsOnExtendedEditionsChange();
  }

  availableEditions: Observable<AvailableEdition[]> =
    this.dataService.getAvailableEditions();

  conditionSearch: string | null = null;

  editionForm = this.formBuilder.nonNullable.group({
    editionName: ['', Validators.required],
    editionPrefix: ['', Validators.required],
    extendedEditions: [<AvailableEdition[]>[], Validators.required],
    conditions: [<string[]>[]],
    newHazardousTerrain: [false],
  });

  editionIdentityMatcher: TuiIdentityMatcher<AvailableEdition> = (e1, e2) =>
    e1.prefix === e2.prefix;

  @tuiPure
  filterConditions(search: string | null): readonly string[] {
    return Object.keys(ConditionName).filter((item) =>
      TUI_DEFAULT_MATCHER(item, search || ``)
    );
  }

  save(): void {
    const model = new EditionBaseData();
    const rawValue = this.editionForm.getRawValue();
    model.editionName = rawValue.editionName;
    model.editionPrefix = rawValue.editionPrefix;
    model.extendedEditions = rawValue.extendedEditions.map((e) => e.prefix);
    model.conditions = rawValue.conditions;
    model.newHazardousTerrain = rawValue.newHazardousTerrain;
    this.localDataService.baseData.save(model);
  }

  private setEditionConditionsOnExtendedEditionsChange() {
    this.editionForm.controls.extendedEditions.valueChanges
      .pipe(
        mergeMap((data) => {
          if (data === null) return of([]);
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
}
