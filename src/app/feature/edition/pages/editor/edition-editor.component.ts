import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { EditionData } from '@ghs/game/model/data/EditionData';
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
    private readonly destroy$: TuiDestroyService
  ) {
    this.setEditionConditionsOnExtendedEditionsChange();
  }

  availableEditions: Observable<AvailableEdition[]> =
    this.dataService.getAvailableEditions();

  conditionSearch: string | null = null;

  editionForm = this.formBuilder.group({
    editionName: this.formBuilder.control('', Validators.required),
    editionPrefix: this.formBuilder.control('', Validators.required),
    extendedEditions: this.formBuilder.control<AvailableEdition[]>(
      [],
      Validators.required
    ),
    conditions: this.formBuilder.control<string[]>([]),
    newHazardousTerrain: this.formBuilder.control(false),
    newAttackModifierStyle: this.formBuilder.control(false),
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
    const model = new EditionData('test', [], [], [], [], [], []);
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
