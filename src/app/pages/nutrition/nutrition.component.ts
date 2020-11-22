import {AfterViewInit, ChangeDetectorRef, Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {NavigationCancel, Router} from '@angular/router';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {NutritionRecord} from '../../models/data/nutrition-record';
import {
  getNutritionKeys, NutritionProperties,
} from '../../utils/nutrition.util';
import {HideAnimatingComponent} from '../../components/base/hide-animating/hide-animating.component';
import {NutritionWaveComponent} from '../../components/nutrition/nutrition-wave/nutrition-wave.component';
import {combineLatest} from 'rxjs';
import {NutritionRecordDataService} from '../../services/data/nutrition-record-data.service';
import {StorageService} from '../../services/common/storage.service';
import {ToastService} from '../../components/common/toast/toast.service';
import {AppService} from '../../services/common/app.service';
import {UserData} from '../../models/data/user-data';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {map} from 'rxjs/operators';
import {FoodRecordDataService} from '../../services/data/food-record-data.service';
import {FoodRecord} from '../../models/data/food-record';
import {ArchivedFoodDataService} from '../../services/data/archived-food-data.service';

export type ActionsFadingState = 'fade-out' | 'fade-in';
export const ACTIONS_FADE_OUT = 'fade-out';
export const ACTIONS_FADE_IN = 'fade-in';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss'],
  providers: [
    SubscriptionService,
  ],
  animations: [
    trigger('actionsFading', [
      state(ACTIONS_FADE_OUT, style({
        transform: 'translateY(100%)',
        opacity: 0,
      })),
      state(ACTIONS_FADE_IN, style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
      transition(`${ACTIONS_FADE_OUT} => ${ACTIONS_FADE_IN}`, animate('.5s linear')),
      transition(`${ACTIONS_FADE_IN} => ${ACTIONS_FADE_OUT}`, animate('.1s linear')),
    ])
  ]
})
export class NutritionComponent extends HideAnimatingComponent implements OnInit, AfterViewInit {
  // nutrition wave list
  @ViewChildren(NutritionWaveComponent) nutritionWaveList: QueryList<NutritionWaveComponent>;
  // actions animation state
  actionsState: ActionsFadingState = ACTIONS_FADE_OUT;
  // nutrition record
  nutritionRecord: NutritionRecord;
  // nutrition keys
  nutritionKeys: (keyof NutritionProperties)[] = getNutritionKeys();
  // user data
  private _user: UserData;
  // food records
  private _foodRecords: FoodRecord[] = [];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private appService: AppService,
    private toastService: ToastService,
    private storageService: StorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private subscriptionService: SubscriptionService,
    private foodRecordDataService: FoodRecordDataService,
    private archivedFoodDataService: ArchivedFoodDataService,
    private nutritionRecordDataService: NutritionRecordDataService,
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscribeRouterEvents();
    this._subscribeUserData();
  }

  ngAfterViewInit(): void {
    this.actionsState = ACTIONS_FADE_IN;
    this.changeDetectorRef.detectChanges();
  }

  /**
   * return required nutrition by type
   * @param type type
   */
  getRequiredNutrition(type: keyof NutritionProperties): number {
    switch (type) {
      case 'carbohydrates': {
        return this.nutritionRecord?.requiredCarbohydrates || 0;
      }

      case 'proteins': {
        return this.nutritionRecord?.requiredProteins || 0;
      }

      case 'fats': {
        return this.nutritionRecord?.requiredFats || 0;
      }
    }
  }

  /**
   * return fulfilled nutrition by type
   * @param type type
   */
  getFulfilledNutrition(type: keyof NutritionProperties): number {
    switch (type) {
      case 'carbohydrates': {
        return this.nutritionRecord?.fulfilledCarbohydrates || 0;
      }

      case 'proteins': {
        return this.nutritionRecord?.fulfilledProteins || 0;
      }

      case 'fats': {
        return this.nutritionRecord?.fulfilledFats || 0;
      }
    }
  }

  /**
   * subscribe router events to detect navigation canceled
   */
  private _subscribeRouterEvents(): void {
    const sub = this.router.events
      .subscribe(event => {
        if (event instanceof NavigationCancel) {
          this.rewindHidingAnimation();
        }
      });

    this.subscriptionService.store('_subscribeRouterEvents', sub);
  }

  /**
   * subscribe user data
   */
  private _subscribeUserData(): void {
    const sub = this.appService.user$
      .subscribe(res => {
        // user will always exists
        // because the guard will prevent access this page
        // when user data doesn't exist
        this._user = res;
        this._getNutritionRecord();
      });

    this.subscriptionService.store('_subscribeUserData', sub);
  }

  /**
   * start leaving animation
   */
  startLeavingAnimation(): void {
    this._subscribeHidingWaves();
    this.actionsState = ACTIONS_FADE_OUT;
  }

  /**
   * hide waves when leaving the page
   */
  private _subscribeHidingWaves(): void {
    const sub = combineLatest(
      this.nutritionWaveList.map(wave => wave.startHiding())
    ).subscribe(res => {
      if (res.every(ended => ended)) {
        this.leavingAnimationEnd.emit();
      }
    });

    this.subscriptionService.store('startLeavingAnimation', sub);
  }

  /**
   * rewind hiding animation
   */
  rewindHidingAnimation(): void {
    this.nutritionWaveList.forEach(wave => wave.startShowing());
    this.actionsState = ACTIONS_FADE_IN;
  }

  /**
   * get nutrition data
   */
  private _getNutritionRecord(): void {
    const sub = this.nutritionRecordDataService
      .getNutritionRecord(this._user.id)
      .subscribe({
        next: res => {
          this.nutritionRecord = res || new NutritionRecord();
          this.nutritionRecord.updateUserData(this._user);

          if (res) {
            this._updateNutritionRecord();
          } else {
            this._saveNutritionRecord();
          }

          this._getFoodRecordsForNutrition();
        },
        error: err => {
          this.toastService.open('error', err.message);
        }
      });

    this.subscriptionService.store('_getNutritionRecord', sub);
  }

  /**
   * get food records for nutrition data
   */
  private _getFoodRecordsForNutrition(): void {
    const sub = this.foodRecordDataService
      .getFoodRecords(this.nutritionRecord.id)
      .subscribe({
        next: res => {
          this._foodRecords = res || [];
          this._getFoodForRecords();
        },
      });

    this.subscriptionService.store('_getFoodRecordsForNutrition', sub);
  }

  /**
   * get food data for each food record item
   */
  private _getFoodForRecords(): void {
    const observables = this._foodRecords.map(item => {
      return this.archivedFoodDataService.getFoodById(item.foodId)
        .pipe(map(res => {
          item.food = res;
        }));
    });

    const sub = combineLatest(observables)
      .subscribe({
        next: () => {
          this.nutritionRecord.foodRecords = this._foodRecords;
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_getFoodForRecords', sub);
  }

  /**
   * update nutrition record after created
   */
  private _updateNutritionRecord(): void {
    const sub = this.nutritionRecordDataService
      .updateNutritionRecord(this.nutritionRecord)
      .subscribe({
        next: () => {
          // updated
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_updateNutritionRecord', sub);
  }

  /**
   * save nutrition record after created
   */
  private _saveNutritionRecord(): void {
    const sub = this.nutritionRecordDataService
      .saveNutritionRecord(this.nutritionRecord)
      .subscribe({
        next: () => {
          // saved
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_saveNutritionRecord', sub);
  }
}
