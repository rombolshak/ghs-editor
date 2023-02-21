import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioRoomsEditorComponent } from './scenario-rooms-editor.component';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { TuiAlertOptions, TuiAlertService } from '@taiga-ui/core';
import { TuiIdService, TuiLetModule } from '@taiga-ui/cdk';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ScenariosServicesModule } from '@app/feature/scenarios/scenarios-services.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { TuiTabsModule } from '@taiga-ui/kit';

describe('ScenarioRoomsEditorComponent', () => {
  let component: ScenarioRoomsEditorComponent;
  let fixture: ComponentFixture<ScenarioRoomsEditorComponent>;
  const storage = new GhseDataStorageService();
  const scenariosListService = new ScenariosListService(storage);
  let detailsService: ScenarioDetailsService;

  beforeEach(async () => {
    localStorage.clear();
    detailsService = new ScenarioDetailsService(
      scenariosListService,
      storage,
      new TuiAlertService({} as TuiAlertOptions<any>, new TuiIdService()),
      'test'
    );
    await TestBed.configureTestingModule({
      declarations: [ScenarioRoomsEditorComponent],
      imports: [ScenariosServicesModule, SharedModule, CoreModule, TuiTabsModule, TuiLetModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ detailsService: detailsService }) },
        },
        {
          provide: GhseDataStorageService,
          useValue: storage,
        },
        {
          provide: ScenariosListService,
          useValue: scenariosListService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioRoomsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
