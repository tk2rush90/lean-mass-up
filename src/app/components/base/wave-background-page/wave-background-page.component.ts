import {HideAnimatingComponent} from '../hide-animating/hide-animating.component';
import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {WaveBackgroundComponent} from '../../common/wave-background/wave-background.component';
import {getStyle} from '../../../utils/element.util';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {NavigationCancel, Router} from '@angular/router';
import {under1024} from '../../../utils/window.util';

@Component({
  selector: 'app-wave-background-page',
  template: '',
})
export class WaveBackgroundPageComponent<T> extends HideAnimatingComponent implements AfterViewInit, OnDestroy {
  // wave background component
  @ViewChild(WaveBackgroundComponent) waveBackground: WaveBackgroundComponent;
  // wave background component as elementRef
  @ViewChild(WaveBackgroundComponent, {read: ElementRef}) waveBackgroundRef: ElementRef<HTMLElement>;
  // wave animation object
  protected _waveAnimation: Animation;
  // form animation object
  protected _formAnimation: Animation;
  // form ref should be registered
  protected _formRef: ElementRef<HTMLElement>;
  // wave hidden state
  protected _waveHidden = false;
  // form box hidden state
  protected _formHidden = false;

  constructor(
    protected router: Router,
    protected renderer: Renderer2,
    protected subscriptionService: SubscriptionService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.startEnteringAnimation();
    this._subscribeRouterChanges();
  }

  ngOnDestroy(): void {
    this._removeEventListeners();
  }

  /**
   * start showing wave background and form box
   */
  startEnteringAnimation(): void {
    this._showForm();
    this._setWaveHeightLevel();
  }

  /**
   * start hiding wave background and form box
   */
  startLeavingAnimation(): void {
    this._setWaveCurrentState();
    this._setFormCurrentState();
    this._stopWaveAnimation();
    this._stopFormAnimation();
    this._hideWaveBackground();
    this._hideForm();
    this._addEventListeners();
  }

  /**
   * subscribe router change to rewind hiding animation
   */
  private _subscribeRouterChanges(): void {
    const sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationCancel) {
        this._rewindHidingAnimations();
      }
    });

    this.subscriptionService.store('_subscribeRouterChanges', sub);
  }

  /**
   * rewind hiding animations
   */
  private _rewindHidingAnimations(): void {
    this._waveHidden = false;
    this._formHidden = false;
    this._setWaveCurrentState();
    this._setFormCurrentState();
    this._stopWaveAnimation();
    this._stopFormAnimation();
    this._removeEventListeners();
    this._showWaveBackground();
    this._showForm();
  }

  /**
   * set wave height level when view initialized
   */
  private _setWaveHeightLevel(): void {
    this.waveBackground.targetHeightLevel = .55;
  }

  /**
   * start animating to slide up wave background
   */
  private _showWaveBackground(): void {
    // do not animate when window size is under `1024`
    if (!under1024()) {
      this._waveAnimation = this.waveBackgroundRef.nativeElement.animate({
        top: 0,
      }, {
        duration: 1000,
        fill: 'forwards',
        easing: 'cubic-bezier(0, .6, .8, 1)',
      });
    }
  }

  /**
   * start animating to hide wave background
   */
  private _hideWaveBackground(): void {
    // do not animate when window size is under `1024`
    if (!under1024()) {
      this._waveAnimation = this.waveBackgroundRef.nativeElement.animate({
        top: '100%',
      }, {
        duration: 1000,
        fill: 'forwards',
        easing: 'cubic-bezier(0, .6, .8, 1)',
      });
    } else {
      this._waveHiddenHandler();
    }
  }

  /**
   * start animating to slide up form box
   */
  private _showForm(): void {
    if (under1024()) {
      this._fadeInForm();
    } else {
      this._showFormFromBottom();
    }
  }

  /**
   * slider up the form from the bottom
   */
  private _showFormFromBottom(): void {
    this._formAnimation = this._formRef.nativeElement.animate({
      top: 0,
      opacity: 1,
    }, {
      duration: 1000,
      fill: 'forwards',
      easing: 'cubic-bezier(0, .6, .8, 1)',
    });
  }

  /**
   * fade in the form
   */
  private _fadeInForm(): void {
    this._formAnimation = this._formRef.nativeElement.animate({
      opacity: 1,
    }, {
      duration: 300,
      fill: 'forwards',
    });
  }

  /**
   * start animating to hide form box
   */
  private _hideForm(): void {
    if (under1024()) {
      this._fadeOutForm();
    } else {
      this._hideFormFromTop();
    }
  }

  /**
   * slide down the form from the top
   */
  private _hideFormFromTop(): void {
    this._formAnimation = this._formRef.nativeElement.animate({
      top: '100%',
      opacity: 0,
    }, {
      duration: 1000,
      fill: 'forwards',
      easing: 'cubic-bezier(0, .6, .8, 1)',
    });
  }

  /**
   * fade out the form
   */
  private _fadeOutForm(): void {
    this._formAnimation = this._formRef.nativeElement.animate({
      opacity: 0,
    }, {
      duration: 300,
      fill: 'forwards',
    });
  }

  /**
   * add event listeners to detect end of hiding animations from wave background and form box
   */
  private _addEventListeners(): void {
    this._addWaveHiddenListener();
    this._addFormHiddenListener();
  }

  /**
   * add listener to detect end of hiding animation from wave background
   */
  private _addWaveHiddenListener(): void {
    this._waveAnimation?.addEventListener('finish', this._waveHiddenHandler);
  }

  /**
   * add listener to detect end of hiding animation from form box
   */
  private _addFormHiddenListener(): void {
    this._formAnimation?.addEventListener('finish', this._formHiddenHandler);
  }

  /**
   * set `_waveHidden` to `true` when hiding wave is completed and check to emit `leavingAnimationEnd`
   */
  private _waveHiddenHandler = (): void => {
    this._waveHidden = true;
    this._emitLeavingAnimationEnd();
  }

  /**
   * set `_formHidden` to `true` when hiding form box is completed and check to emit `leavingAnimationEnd`
   */
  private _formHiddenHandler = (): void => {
    this._formHidden = true;
    this._emitLeavingAnimationEnd();
  }

  /**
   * set current style state to form box before start new animation
   */
  private _setFormCurrentState(): void {
    const form = this._formRef.nativeElement;

    this.renderer.setStyle(form, 'opacity', getStyle(form, 'opacity'));
    this.renderer.setStyle(form, 'top', getStyle(form, 'top'));
  }

  /**
   * set current style state to wave before start new animation
   */
  private _setWaveCurrentState(): void {
    const wave = this.waveBackgroundRef.nativeElement;

    this.renderer.setStyle(wave, 'top', getStyle(wave, 'top'));
  }

  /**
   * emit `leavingAnimationEnd` when both `_waveHidden` and `_formHidden` are `true`
   */
  private _emitLeavingAnimationEnd(): void {
    if (this._waveHidden && this._formHidden) {
      this.leavingAnimationEnd.emit();
    }
  }

  /**
   * stop running save animation
   */
  private _stopWaveAnimation(): void {
    this._waveAnimation?.cancel();
  }

  /**
   * stop running form box animation
   */
  private _stopFormAnimation(): void {
    this._formAnimation?.cancel();
  }

  /**
   * remove event listeners for both wave and form box
   */
  private _removeEventListeners(): void {
    this._removeWaveEventListener();
    this._removeFormEventListener();
  }

  private _removeWaveEventListener(): void {
    this._waveAnimation?.removeEventListener('finish', this._waveHiddenHandler);
  }

  private _removeFormEventListener(): void {
    this._formAnimation?.removeEventListener('finish', this._formHiddenHandler);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.startEnteringAnimation();
  }
}
