import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ghse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ghs-editor';
}
