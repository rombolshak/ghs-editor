import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, TuiButtonModule, TuiLoaderModule],
  exports: [CommonModule, TuiButtonModule, TuiLoaderModule],
})
export class SharedModule {}
