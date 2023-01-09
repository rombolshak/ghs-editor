import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EditionData } from '@ghs/game/model/data/EditionData';
import { FormBuilder } from '@angular/forms';
import { PredefinedEditionsDataService } from '@app/shared/predefined-editions-data.service';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { map, Observable, tap } from 'rxjs';
import { TUI_DEFAULT_MATCHER, tuiPure } from '@taiga-ui/cdk';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiValueContentContext } from '@taiga-ui/core';

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
  ) {}
  model: EditionData = new EditionData('test', [], [], [], [], [], []);

  availableEditions: Observable<string[]> = this.dataService
    .getAvailableEditions()
    .pipe(
      tap((data) => (this._availableEditions = data)),
      map((data) => data.map((item) => item.prefix))
    );

  editionForm = this.formBuilder.group({
    editionName: this.formBuilder.control(''),
    editionPrefix: this.formBuilder.control(''),
    extendedEditions: this.formBuilder.control([]),
    conditions: this.formBuilder.control(''),
    newHazardousTerrain: this.formBuilder.control(''),
    newAttackModifierStyle: this.formBuilder.control(''),
  });

  get editionName(): PolymorpheusContent<TuiValueContentContext<string>> {
    return ({ $implicit }) =>
      this._availableEditions.find((e) => e.prefix === $implicit)!.name;
  }

  private _availableEditions: AvailableEdition[] = [];
}
