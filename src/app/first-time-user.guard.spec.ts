import { TestBed } from '@angular/core/testing';

import { FirstTimeUserGuard } from './first-time-user.guard';

describe('FirstTimeUserGuard', () => {
  let guard: FirstTimeUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstTimeUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
