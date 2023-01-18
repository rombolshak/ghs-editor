import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionDataLoaderGuard } from '@app/core/guards/edition-data-loader.guard';

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
    canLoad: [EditionDataLoaderGuard],
  },
  { path: '**', redirectTo: 'edition', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
