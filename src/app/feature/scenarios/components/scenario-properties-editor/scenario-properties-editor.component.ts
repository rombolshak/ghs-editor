import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NonNullableFormBuilder } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { ScenarioDetailsBaseComponent } from '@app/feature/scenarios/components/scenario-details-base.component';
import { Scenario, ScenarioProperties } from '@app/core/models/scenario.models';
import { ObjectiveData } from '@ghs/game/model/data/ObjectiveData';
import { LootDeckConfig } from '@ghs/game/model/Loot';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { Observable, of, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { ScenarioHelper } from '@app/core/services/business/scenario.helper';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiValueContentContext } from '@taiga-ui/core';

@Component({
  selector: 'ghse-scenario-properties-editor',
  templateUrl: './scenario-properties-editor.component.html',
  styleUrls: ['./scenario-properties-editor.component.less'],
  providers: [{ provide: TuiDestroyService }],
})
export class ScenarioPropertiesEditorComponent
  extends ScenarioDetailsBaseComponent<ScenarioProperties>
  implements OnInit
{
  constructor(
    activatedRoute: ActivatedRoute,
    destroy$: TuiDestroyService,
    formBuilder: NonNullableFormBuilder,
    private readonly scenariosListService: ScenariosListService
  ) {
    const form = formBuilder.group({
      blocks: [<string[]>[]],
      unlocks: [<string[]>[]],
      requires: formBuilder.array([formBuilder.control<string[]>([]), formBuilder.control<string[]>([])]),
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
          .map(s => [ScenarioHelper.getBusinessId(s), ScenarioHelper.getFullName(s)])
      );

      this.scenariosIds = Array.from(this.scenarios.keys());
      this.filteredItems$ = this.search$.pipe(
        switchMap(search => {
          return of(
            Array.from(this.scenarios?.entries() ?? [])
              .filter(s => s[1].toLowerCase().includes(search.toLowerCase()))
              .map(s => s[0])
          );
        }),
        startWith(this.scenariosIds)
      );
    });
  }

  scenarios: Map<string, string> | null = null;
  scenariosIds: string[] | null = null;
  scenarioName: PolymorpheusContent<TuiValueContentContext<string>> = ({ $implicit }) => this.scenarios?.get($implicit);

  private readonly search$ = new Subject<string>();
  filteredItems$: Observable<string[] | null> | undefined;

  onSearchChange(search: string): void {
    this.search$.next(search);
  }
}
