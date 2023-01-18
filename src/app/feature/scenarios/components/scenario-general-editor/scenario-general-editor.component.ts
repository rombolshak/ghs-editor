import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ghse-scenario-general-editor',
  templateUrl: './scenario-general-editor.component.html',
  styleUrls: ['./scenario-general-editor.component.less'],
})
export class ScenarioGeneralEditorComponent {
  constructor(private readonly formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    index: ['', Validators.required],
    group: null,
    name: ['', Validators.required],
    initial: false,
  });
}
