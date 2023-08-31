import { TestBed } from '@angular/core/testing';

import { SessionTimeoutInterceptorService } from './session-timeout-interceptor.service';

describe('SessionTimeoutInterceptorService', () => {
  let service: SessionTimeoutInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTimeoutInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
