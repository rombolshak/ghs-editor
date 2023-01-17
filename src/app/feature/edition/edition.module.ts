import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionEditorComponent } from './pages/editor/edition-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiCheckboxBlockModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import { EditionRoutingModule } from '@app/feature/edition/edition-routing.module';
import {
  TuiTextfieldControllerModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiErrorModule,
  TuiTooltipModule,
  TuiHintModule,
} from '@taiga-ui/core';
import { EditionServicesModule } from '@app/feature/edition/edition-services.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [EditionEditorComponent],
  imports: [
    CommonModule,
    EditionRoutingModule,
    EditionServicesModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiLabelModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiCheckboxBlockModule,
    TuiTooltipModule,
    TuiHintModule,
    SharedModule,
  ],
  exports: [EditionEditorComponent],
})
export class EditionModule {}
