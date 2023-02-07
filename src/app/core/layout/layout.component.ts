import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InteractionLoaderService } from '@app/core/services/interaction-loader.service';

@Component({
  selector: 'ghse-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  constructor(public loaderService: InteractionLoaderService) {}
}
