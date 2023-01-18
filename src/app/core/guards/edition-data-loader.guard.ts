import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BaseEditionDataService } from '@app/core/services/base-edition-data.service';
import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({ providedIn: 'root' })
export class EditionDataLoaderGuard implements CanLoad {
  constructor(
    private readonly baseDataService: BaseEditionDataService,
    private readonly alertService: TuiAlertService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.baseDataService.baseEditionData$.pipe(
      map(data => {
        const result = data.editionPrefix?.length > 0;
        if (!result) {
          this.alertService
            .open('You need to specify edition prefix first', { status: TuiNotification.Error })
            .subscribe();
        }
        return result;
      })
    );
  }
}
