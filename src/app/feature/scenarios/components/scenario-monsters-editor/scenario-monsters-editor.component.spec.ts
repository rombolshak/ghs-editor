import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioMonstersEditorComponent } from './scenario-monsters-editor.component';
import { GhseDataStorageService } from '@app/core/services/storage/ghse-data-storage.service';
import { ScenariosListService } from '@app/core/services/business/scenarios-list.service';
import { ScenarioDetailsService } from '@app/core/services/business/scenario-details.service';
import { TuiAlertOptions, TuiAlertService } from '@taiga-ui/core';
import { TuiIdService } from '@taiga-ui/cdk';
import { SharedModule } from '@app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ScenarioMonstersEditorComponent', () => {
  let component: ScenarioMonstersEditorComponent;
  let fixture: ComponentFixture<ScenarioMonstersEditorComponent>;
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
      declarations: [ScenarioMonstersEditorComponent],
      imports: [SharedModule, RouterTestingModule.withRoutes([])],
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

    fixture = TestBed.createComponent(ScenarioMonstersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
