import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditionData } from '@ghs/game/model/data/EditionData';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './edition-editor.component.html',
  styleUrls: ['./edition-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditionEditorComponent {
  constructor(private readonly formBuilder: FormBuilder) {}
  model: EditionData = new EditionData('test', [], [], [], [], [], []);

  editionForm = this.formBuilder.group({
    editionName: this.formBuilder.control(''),
    editionPrefix: this.formBuilder.control(''),
    extendedEditions: this.formBuilder.control(''),
    conditions: this.formBuilder.control(''),
    newHazardousTerrain: this.formBuilder.control(''),
    newAttackModifierStyle: this.formBuilder.control(''),
  });

  availableEditions = [];
}
