import { TestBed } from '@angular/core/testing';

import { InteractionLoaderService } from './interaction-loader.service';

describe('InteractionBlockingService', () => {
  let service: InteractionLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractionLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should block and unblock', () => {
    service.isLocked$.subscribe(value => expect(value).toBeFalse()).unsubscribe();
    service.addBlock('aaa');
    service.isLocked$.subscribe(value => expect(value).toBeTrue()).unsubscribe();
    service.addBlock('bbb');
    service.isLocked$.subscribe(value => expect(value).toBeTrue()).unsubscribe();
    service.releaseBlock('bbb');
    service.isLocked$.subscribe(value => expect(value).toBeTrue()).unsubscribe();
    service.releaseBlock('ccc');
    service.isLocked$.subscribe(value => expect(value).toBeTrue()).unsubscribe();
    service.releaseBlock('aaa');
    service.isLocked$.subscribe(value => expect(value).toBeFalse()).unsubscribe();
  });
});
