import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenariosRoutingModule } from './scenarios-routing.module';
import { ScenariosServicesModule } from './scenarios-services.module';
import { ScenariosListComponent } from './pages/scenarios-list/scenarios-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { ScenarioDetailComponent } from './pages/scenario-detail/scenario-detail.component';
import { TuiCheckboxLabeledModule, TuiStepperModule } from '@taiga-ui/kit';
import { ScenarioGeneralEditorComponent } from './components/scenario-general-editor/scenario-general-editor.component';
import { ScenarioPropertiesEditorComponent } from './components/scenario-properties-editor/scenario-properties-editor.component';
import { ScenarioMonstersEditorComponent } from './components/scenario-monsters-editor/scenario-monsters-editor.component';
import { ScenarioRoomsEditorComponent } from './components/scenario-rooms-editor/scenario-rooms-editor.component';
import { ScenarioRulesEditorComponent } from './components/scenario-rules-editor/scenario-rules-editor.component';
import { ScenarioSectionsEditorComponent } from './components/scenario-sections-editor/scenario-sections-editor.component';

@NgModule({
  declarations: [
    ScenariosListComponent,
    ScenarioDetailComponent,
    ScenarioGeneralEditorComponent,
    ScenarioPropertiesEditorComponent,
    ScenarioMonstersEditorComponent,
    ScenarioRoomsEditorComponent,
    ScenarioRulesEditorComponent,
    ScenarioSectionsEditorComponent,
  ],
  imports: [
    CommonModule,
    ScenariosRoutingModule,
    ScenariosServicesModule,
    SharedModule,
    TuiStepperModule,
    TuiCheckboxLabeledModule,
  ],
})
export class ScenariosModule {}
