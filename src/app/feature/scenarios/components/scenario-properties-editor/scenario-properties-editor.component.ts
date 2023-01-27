import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'ghse-scenario-properties-editor',
  templateUrl: './scenario-properties-editor.component.html',
  styleUrls: ['./scenario-properties-editor.component.less'],
})
export class ScenarioPropertiesEditorComponent {
  constructor(activatedRoute: ActivatedRoute, formBuilder: NonNullableFormBuilder, destroy$: TuiDestroyService) {
    const form = formBuilder.group({
      index: ['', Validators.required],
      group: '',
      name: ['', Validators.required],
      initial: false,
    });
  }
}
