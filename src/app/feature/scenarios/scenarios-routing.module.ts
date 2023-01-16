import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScenariosListComponent } from '@app/feature/scenarios/pages/scenarios-list/scenarios-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ScenariosListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScenariosRoutingModule {}
