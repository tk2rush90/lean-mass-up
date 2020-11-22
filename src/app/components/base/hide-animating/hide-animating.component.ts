import {EventEmitter} from '@angular/core';

export abstract class HideAnimatingComponent {
  // emit when leaving animation ended
  leavingAnimationEnd: EventEmitter<void> = new EventEmitter<void>();

  /**
   * implement leaving animation
   */
  startLeavingAnimation(): void {}
}
