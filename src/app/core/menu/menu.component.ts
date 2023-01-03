import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {AboutDialogComponent} from "../about-dialog/about-dialog.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  constructor(private readonly dialogService: TuiDialogService,
              private readonly injector: Injector) {}

  items = [
    "edition",
    "scenarios",
    "monsters",
    "decks",
    "characters",
    "items"
  ]

  productName = 'Gloomhaven Secretariat Data Editor'

  showAbout() {
    this.dialogService.open(new PolymorpheusComponent(AboutDialogComponent, this.injector), {
      label: this.productName
    }).subscribe();
  }
}
