import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiForModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, RouterModule, TuiIslandModule, TuiForModule],
})
export class CoreModule {}
