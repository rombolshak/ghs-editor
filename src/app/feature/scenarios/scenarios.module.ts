import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenariosRoutingModule } from './scenarios-routing.module';
import { ScenariosServicesModule } from './scenarios-services.module';
import { ScenariosListComponent } from './pages/scenarios-list/scenarios-list.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ScenariosListComponent],
  imports: [CommonModule, ScenariosRoutingModule, ScenariosServicesModule, SharedModule],
})
export class ScenariosModule {}
