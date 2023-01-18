import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiHintModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

const tuiModules = [
  CommonModule,
  ReactiveFormsModule,
  TuiButtonModule,
  TuiLoaderModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiIslandModule,
  TuiTextfieldControllerModule,
  TuiDataListModule,
  TuiLabelModule,
  TuiErrorModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiMultiSelectModule,
  TuiTooltipModule,
  TuiHintModule,
  TuiMarkerIconModule,
];
@NgModule({
  declarations: [],
  imports: tuiModules,
  exports: tuiModules,
})
export class SharedModule {}
