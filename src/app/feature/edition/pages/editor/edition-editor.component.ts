import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditionData } from '@ghs/game/model/data/EditionData';
import { FormBuilder } from '@angular/forms';
import { PredefinedEditionsDataService } from '@app/shared/predefined-editions-data.service';
import { AvailableEdition } from '@app/shared/models/available-edition';
import { Observable } from 'rxjs';
import { TuiIdentityMatcher } from '@taiga-ui/cdk';

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

  availableEditions: Observable<AvailableEdition[]> =
    this.dataService.getAvailableEditions();

  editionForm = this.formBuilder.group({
    editionName: this.formBuilder.control(''),
    editionPrefix: this.formBuilder.control(''),
    extendedEditions: this.formBuilder.control<AvailableEdition[]>([]),
    conditions: this.formBuilder.control(''),
    newHazardousTerrain: this.formBuilder.control(''),
    newAttackModifierStyle: this.formBuilder.control(''),
  });

  editionIdentityMatcher: TuiIdentityMatcher<AvailableEdition> = (e1, e2) =>
    e1.prefix === e2.prefix;
}
