import { TestBed } from '@angular/core/testing';

import { PredefinedEditionsDataService } from './predefined-editions-data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('PredefinedEditionsDataService', () => {
  let service: PredefinedEditionsDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PredefinedEditionsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
