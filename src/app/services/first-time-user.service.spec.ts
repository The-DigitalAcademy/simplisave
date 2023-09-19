import { TestBed } from '@angular/core/testing';

import { FirstTimeUserService } from './first-time-user.service';

describe('FirstTimeUserService', () => {
  let service: FirstTimeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstTimeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
