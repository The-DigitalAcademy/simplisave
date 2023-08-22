import { TestBed } from '@angular/core/testing';

import { EmptyBehaviorGuardGuard } from './empty-behavior-guard.guard';

describe('EmptyBehaviorGuardGuard', () => {
  let guard: EmptyBehaviorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmptyBehaviorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
