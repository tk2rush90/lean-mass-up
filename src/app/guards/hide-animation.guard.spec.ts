import { TestBed } from '@angular/core/testing';

import { HideAnimationGuard } from './hide-animation.guard';

describe('HideAnimationGuard', () => {
  let guard: HideAnimationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HideAnimationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
