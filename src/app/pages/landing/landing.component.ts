import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LogoComponent} from '../../components/common/logo/logo.component';
import {UserData} from '../../models/data/user-data';
import {Router} from '@angular/router';
import {StorageService} from '../../services/common/storage.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ToastService} from '../../components/common/toast/toast.service';
import {under1024} from '../../utils/window.util';
import {AppService} from '../../services/common/app.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  // read `LogoComponent` as `elementRef`
  @ViewChild(LogoComponent, {read: ElementRef}) logo: ElementRef<HTMLElement>;
  // created user data
  // if user data exists, redirect to nutrition page
  // else, redirect to calculate page
  private _user: UserData;
  // element animation object
  private _animation: Animation;

  constructor(
    private router: Router,
    private appService: AppService,
    private toastService: ToastService,
    private storageService: StorageService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeUserData();
  }

  ngOnDestroy(): void {
    this._removeAnimationFinishEvent();
  }

  /**
   * subscribe user data from db
   */
  private _subscribeUserData(): void {
    const sub = this.appService.user$
      .subscribe({
        next: res => {
          this._user = res;
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_subscribeUserData', sub);
  }

  /**
   * run animation after logo rendered
   */
  afterRendered(): void {
    if (under1024()) {
      this._hideLogo();
    } else {
      this._animateToTop();
    }

    this._addAnimationFinishEvent();
  }

  /**
   * move `LogoComponent` to on the top of the page
   */
  private _animateToTop(): void {
    this._animation = this.logo.nativeElement.animate({
      top: '50px',
      transform: 'translate(-50%, 0)'
    }, {
      duration: 400,
      delay: 300,
      easing: 'cubic-bezier(0, .8, .8, 1)',
      fill: 'forwards',
    });
  }

  /**
   * hide logo when view is mobile
   */
  private _hideLogo(): void {
    this._animation = this.logo.nativeElement.animate({
      opacity: 0,
    }, {
      duration: 400,
      delay: 300,
      fill: 'forwards',
    });
  }

  private _addAnimationFinishEvent(): void {
    this._animation.addEventListener('finish', this._moveToSpecificPage);
  }

  /**
   * check user data existence and distribute page redirection
   */
  private _moveToSpecificPage = (): void => {
    if (this._user) {
      this._toNutrition();
    } else {
      this._toCalculator();
    }
  }

  /**
   * redirect to calculator
   */
  private _toCalculator(): void {
    this.router.navigate(['/calculator']);
  }

  /**
   * redirect to nutrition
   */
  private _toNutrition(): void {
    this.router.navigate(['/nutrition']);
  }

  /**
   * remove animation finish event
   */
  private _removeAnimationFinishEvent(): void {
    this._animation?.removeEventListener('finish', this._moveToSpecificPage);
  }
}
