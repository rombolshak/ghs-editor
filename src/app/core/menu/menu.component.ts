import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiDialogService } from "@taiga-ui/core";
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  constructor(private readonly dialogService: TuiDialogService) {}

  items = [
    "edition",
    "scenarios",
    "monsters",
    "decks",
    "characters",
    "items"
  ]

  productName = 'Gloomhaven Secretariat Data Editor'
  version = packageJson.version

  showAbout(header: PolymorpheusContent, content: PolymorpheusContent) {
    this.dialogService.open(content, {
      header: header,
      label: this.productName
    }).subscribe();
  }
}
