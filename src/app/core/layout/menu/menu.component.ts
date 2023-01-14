import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import appPackageJson from '../../../../../package.json';
import ghsPackageJson from '../../../../../gloomhavensecretariat/package.json';

@Component({
  selector: 'ghse-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  constructor(private readonly dialogService: TuiDialogService) {}

  items = ['edition', 'scenarios', 'monsters', 'decks', 'characters', 'items'];

  productName = 'Gloomhaven Secretariat Data Editor';
  appVersion = appPackageJson.version;
  ghsVersion = ghsPackageJson.version;

  showAbout(header: PolymorpheusContent, content: PolymorpheusContent) {
    this.dialogService
      .open(content, {
        header: header,
        label: this.productName,
      })
      .subscribe();
  }

  @ViewChild('content', { static: true }) aboutDialogContent!: TemplateRef<any>;
}
