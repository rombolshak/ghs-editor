import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditionEditorComponent } from './feature/edition/pages/editor/edition-editor.component';

const routes: Routes = [
  { path: 'edition', component: EditionEditorComponent },
  { path: '**', redirectTo: 'edition', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
