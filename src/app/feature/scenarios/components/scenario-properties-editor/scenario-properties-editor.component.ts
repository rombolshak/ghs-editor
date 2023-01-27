import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  buildForm,
  ControlsOf,
  ScenarioDetailsBaseComponent,
} from '@app/feature/scenarios/components/scenario-details-base.component';
import { Scenario, ScenarioProperties } from '@app/core/models/scenario.models';
import { ObjectiveData } from '@ghs/game/model/data/ObjectiveData';
import { LootDeckConfig } from '@ghs/game/model/Loot';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { Observable, of, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { ScenarioHelper } from '@app/core/services/business/scenario.helper';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiValueContentContext } from '@taiga-ui/core';

declare interface ScenarioWithData extends Scenario {
  fullName: string;
  businessId: string;
}

@Component({
  selector: 'ghse-scenario-properties-editor',
  templateUrl: './scenario-properties-editor.component.html',
  styleUrls: ['./scenario-properties-editor.component.less'],
})
export class ScenarioPropertiesEditorComponent
  extends ScenarioDetailsBaseComponent<ScenarioProperties>
  implements OnInit
{
  constructor(
    activatedRoute: ActivatedRoute,
    destroy$: TuiDestroyService,
    private readonly scenariosListService: ScenariosListService
  ) {
    const form = buildForm<ScenarioProperties>({
      blocks: [[]],
      unlocks: [<string[]>[]],
      requires: [<string[][]>[]],
    });

    super(
      activatedRoute,
      destroy$,
      service => service.properties$,
      (service, data) => service.updateProperties(data),
      form
    );
  }

  ngOnInit() {
    this.scenariosListService.scenarios$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.scenarios = new Map(
        data
          .filter(s => ScenarioHelper.getBusinessId(s) !== this.currentScenarioId)
          .map(s => [
            ScenarioHelper.getBusinessId(s),
            {
              ...s,
              fullName: ScenarioHelper.getFullName(s),
              businessId: ScenarioHelper.getBusinessId(s),
            },
          ])
      );

      this.scenariosIds = Array.from(this.scenarios.keys());
      this.filteredItems$ = this.search$.pipe(
        switchMap(search => {
          return of(
            Array.from(this.scenarios?.values() ?? [])
              .filter(s => s.fullName.toLowerCase().includes(search.toLowerCase()))
              .map(s => s.businessId)
          ).pipe(startWith(null));
        }),
        startWith(this.scenariosIds)
      );
    });
  }

  scenarios: Map<string, ScenarioWithData> | null = null;
  scenariosIds: string[] | null = null;
  scenarioName: PolymorpheusContent<TuiValueContentContext<string>> = ({ $implicit }) =>
    this.scenarios?.get($implicit)?.fullName;

  private readonly search$ = new Subject<string>();
  filteredItems$: Observable<string[] | null> | undefined;

  onSearchChange(search: string): void {
    this.search$.next(search);
  }
}
