import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { Observable } from 'rxjs';
import { ScenarioDetailsServiceFactory } from '@app/core/services/business/scenario-details-service.factory';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';

@Injectable({ providedIn: ScenariosServicesModule })
export class ScenarioDetailsResolver implements Resolve<ScenarioDetailsService> {
  constructor(private readonly factory: ScenarioDetailsServiceFactory) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ScenarioDetailsService> | Promise<ScenarioDetailsService> | ScenarioDetailsService {
    const id = route.paramMap.get('id') ?? route.parent?.paramMap.get('id') ?? 'new';
    return this.factory.create(id);
  }
}
