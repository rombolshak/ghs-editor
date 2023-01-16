import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiLinkModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';

const tuiModules = [CommonModule, TuiButtonModule, TuiLoaderModule, TuiLinkModule, TuiSvgModule];
@NgModule({
  declarations: [],
  imports: tuiModules,
  exports: tuiModules,
})
export class SharedModule {}
