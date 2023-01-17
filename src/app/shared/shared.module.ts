import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';

const tuiModules = [
  CommonModule,
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
];
@NgModule({
  declarations: [],
  imports: tuiModules,
  exports: tuiModules,
})
export class SharedModule {}
