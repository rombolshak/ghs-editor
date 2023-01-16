import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'edition',
  },
  {
    path: 'edition',
    loadChildren: () => import('./feature/edition/edition.module').then(m => m.EditionModule),
  },
  {
    path: 'scenarios',
    loadChildren: () => import('./feature/scenarios/scenarios.module').then(m => m.ScenariosModule),
  },
  { path: '**', redirectTo: 'edition', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
