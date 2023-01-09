import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionEditorComponent } from './pages/editor/edition-editor.component';

const routes: Routes = [
  { path: '', component: EditionEditorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditionRoutingModule {}
