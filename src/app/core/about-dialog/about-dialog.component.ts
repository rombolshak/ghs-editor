import {ChangeDetectionStrategy, Component} from '@angular/core';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutDialogComponent {
  version = packageJson.version
}
