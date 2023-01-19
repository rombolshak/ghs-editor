import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ScenarioDetailsServiceFactory } from '@app/core/services/business/scenario-details-service.factory';

@Injectable({
  providedIn: 'root',
})
export class NewScenarioStepsGuard implements CanActivateChild {
  constructor(private readonly serviceFactory: ScenarioDetailsServiceFactory) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = childRoute.paramMap.get('id') ?? childRoute.parent?.paramMap.get('id');
    if (!id) return false;
    const isGeneralInfo = childRoute.routeConfig?.path === '';
    return isGeneralInfo || this.serviceFactory.create(id).exists$;
  }
}
