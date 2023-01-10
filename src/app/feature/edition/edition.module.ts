import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditionEditorComponent } from './pages/editor/edition-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import { EditionRoutingModule } from '@app/feature/edition/edition-routing.module';
import {
  TuiTextfieldControllerModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiSvgModule,
} from '@taiga-ui/core';

@NgModule({
  declarations: [EditionEditorComponent],
  imports: [
    CommonModule,
    EditionRoutingModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiLabelModule,
    TuiSvgModule,
  ],
  exports: [EditionEditorComponent],
})
export class EditionModule {}
