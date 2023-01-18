import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionEditorComponent } from './pages/editor/edition-editor.component';

import { EditionRoutingModule } from '@app/feature/edition/edition-routing.module';
import { EditionServicesModule } from '@app/feature/edition/edition-services.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [EditionEditorComponent],
  imports: [CommonModule, EditionRoutingModule, EditionServicesModule, SharedModule],
  exports: [EditionEditorComponent],
})
export class EditionModule {}
