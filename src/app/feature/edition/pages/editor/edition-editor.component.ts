import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditionData } from '@ghs/game/model/data/EditionData';
import { FormBuilder } from '@angular/forms';
import { PredefinedEditionsDataService } from '@app/shared/predefined-editions-data.service';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import {
  TUI_DEFAULT_MATCHER,
  TuiIdentityMatcher,
  tuiPure,
} from '@taiga-ui/cdk';
import { ConditionName } from '@ghs/game/model/Condition';

@Component({
  selector: 'app-editor',
  templateUrl: './edition-editor.component.html',
  styleUrls: ['./edition-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditionEditorComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: PredefinedEditionsDataService
  ) {
    this.setEditionConditionsOnExtendedEdifionsChange();
  }
  model: EditionData = new EditionData('test', [], [], [], [], [], []);

  availableEditions: Observable<AvailableEdition[]> =
    this.dataService.getAvailableEditions();

  conditionSearch: string | null = null;

  editionForm = this.formBuilder.group({
    editionName: this.formBuilder.control(''),
    editionPrefix: this.formBuilder.control(''),
    extendedEditions: this.formBuilder.control<AvailableEdition[]>([]),
    conditions: this.formBuilder.control<string[]>([]),
    newHazardousTerrain: this.formBuilder.control(''),
    newAttackModifierStyle: this.formBuilder.control(''),
  });

  editionIdentityMatcher: TuiIdentityMatcher<AvailableEdition> = (e1, e2) =>
    e1.prefix === e2.prefix;

  @tuiPure
  filterConditions(search: string | null): readonly string[] {
    return Object.keys(ConditionName).filter((item) =>
      TUI_DEFAULT_MATCHER(item, search || ``)
    );
  }

  private setEditionConditionsOnExtendedEdifionsChange() {
    this.editionForm.controls.extendedEditions.valueChanges
      .pipe(
        mergeMap((data) => {
          if (data === null) return of([[]]);
          return forkJoin(
            data.map((edition) =>
              this.dataService.getEditionConditions(edition)
            )
          );
        })
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
