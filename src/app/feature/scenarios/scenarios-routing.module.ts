import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScenariosListComponent } from '@app/feature/scenarios/pages/scenarios-list/scenarios-list.component';
import { ScenarioDetailComponent } from '@app/feature/scenarios/pages/scenario-detail/scenario-detail.component';
import { ScenarioGeneralEditorComponent } from '@app/feature/scenarios/components/scenario-general-editor/scenario-general-editor.component';
import { ScenarioPropertiesEditorComponent } from '@app/feature/scenarios/components/scenario-properties-editor/scenario-properties-editor.component';
import { ScenarioMonstersEditorComponent } from '@app/feature/scenarios/components/scenario-monsters-editor/scenario-monsters-editor.component';
import { ScenarioRoomsEditorComponent } from '@app/feature/scenarios/components/scenario-rooms-editor/scenario-rooms-editor.component';
import { ScenarioRulesEditorComponent } from '@app/feature/scenarios/components/scenario-rules-editor/scenario-rules-editor.component';
import { ScenarioSectionsEditorComponent } from '@app/feature/scenarios/components/scenario-sections-editor/scenario-sections-editor.component';
import { NewScenarioStepsGuard } from '@app/feature/scenarios/services/new-scenario-steps.guard';
import { ScenarioDetailsResolver } from '@app/feature/scenarios/services/scenario-details.resolver';
import { ScenarioObjectivesComponent } from '@app/feature/scenarios/components/scenario-objectives/scenario-objectives.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ScenariosListComponent,
  },
  {
    path: ':id',
    component: ScenarioDetailComponent,
    canActivateChild: [NewScenarioStepsGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ScenarioGeneralEditorComponent,
        resolve: {
          detailsService: ScenarioDetailsResolver,
        },
      },
      {
        path: 'properties',
        component: ScenarioPropertiesEditorComponent,
        resolve: {
          detailsService: ScenarioDetailsResolver,
        },
      },
      {
        path: 'objectives',
        component: ScenarioObjectivesComponent,
        resolve: {
          detailsService: ScenarioDetailsResolver,
        },
      },
      {
        path: 'monsters',
        component: ScenarioMonstersEditorComponent,
        resolve: {
          detailsService: ScenarioDetailsResolver,
        },
      },
      {
        path: 'rooms',
        component: ScenarioRoomsEditorComponent,
        resolve: {
          detailsService: ScenarioDetailsResolver,
        },
      },
      {
        path: 'rules',
        component: ScenarioRulesEditorComponent,
        resolve: {
          detailsService: ScenarioDetailsResolver,
        },
      },
      {
        path: 'sections',
        component: ScenarioSectionsEditorComponent,
        resolve: {
          detailsService: ScenarioDetailsResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScenariosRoutingModule {}
