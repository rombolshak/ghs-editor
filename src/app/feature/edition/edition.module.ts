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
  TuiSvgModule,
  TuiErrorModule,
  TuiButtonModule,
  TuiTooltipModule,
  TuiHintModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { EditionServicesModule } from '@app/feature/edition/edition-services.module';

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
    TuiSvgModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
    TuiCheckboxBlockModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiLoaderModule,
  ],
  exports: [EditionEditorComponent],
})
export class EditionModule {}
