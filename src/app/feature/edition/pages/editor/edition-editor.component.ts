import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditionData } from '@ghs/game/model/data/EditionData';

@Component({
  selector: 'app-editor',
  templateUrl: './edition-editor.component.html',
  styleUrls: ['./edition-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditionEditorComponent {
  model: EditionData = new EditionData('test', [], [], [], [], [], []);
}
