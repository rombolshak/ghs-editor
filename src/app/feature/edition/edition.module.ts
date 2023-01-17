import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionEditorComponent } from './pages/editor/edition-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

import { EditionRoutingModule } from '@app/feature/edition/edition-routing.module';
import { TuiTooltipModule, TuiHintModule } from '@taiga-ui/core';
import { EditionServicesModule } from '@app/feature/edition/edition-services.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [EditionEditorComponent],
  imports: [
    CommonModule,
    EditionRoutingModule,
    EditionServicesModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    TuiTooltipModule,
    TuiHintModule,
    SharedModule,
  ],
  exports: [EditionEditorComponent],
})
export class EditionModule {}
