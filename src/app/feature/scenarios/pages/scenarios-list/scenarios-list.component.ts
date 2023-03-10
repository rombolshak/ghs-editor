import { Component, OnInit } from '@angular/core';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { Scenario } from '@app/core/models/scenario.models';

@Component({
  selector: 'ghse-scenarios-list',
  templateUrl: './scenarios-list.component.html',
  styleUrls: ['./scenarios-list.component.less'],
})
export class ScenariosListComponent implements OnInit {
  constructor(private readonly scenariosService: ScenariosListService) {}
  newScenarioId = crypto.randomUUID();

  isLoading = true;
  scenarios: Array<Scenario> = [];

  scenariosOrder: Map<number, number> | undefined;

  ngOnInit() {
    this.scenariosService.scenarios$.subscribe(data => {
      this.scenarios = data;
      this.scenariosOrder = new Map(data.map((scenario, index) => [index, scenario.order]));
      this.isLoading = false;
    });
  }

  reorder($event: Map<number, number>) {
    this.scenariosService.setScenariosOrder($event);
  }

  removeScenario(scenario: Scenario) {
    this.scenariosService.remove(scenario.id);
  }
}
