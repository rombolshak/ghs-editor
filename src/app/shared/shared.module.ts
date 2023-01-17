import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiLinkModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiIslandModule } from '@taiga-ui/kit';

const tuiModules = [CommonModule, TuiButtonModule, TuiLoaderModule, TuiLinkModule, TuiSvgModule, TuiIslandModule];
@NgModule({
  declarations: [],
  imports: tuiModules,
  exports: tuiModules,
})
export class SharedModule {}
