import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {AppService} from '../../../services/common/app.service';
import {NutritionRecordDataService} from '../../../services/data/nutrition-record-data.service';
import {UserData} from '../../../models/data/user-data';
import {NutritionRecord} from '../../../models/data/nutrition-record';
import {DateService} from '../../../services/common/date.service';
import {FoodRecord} from '../../../models/data/food-record';
import {FoodRecordDataService} from '../../../services/data/food-record-data.service';
import {ToastService} from '../../common/toast/toast.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {ArchivedFoodDataService} from '../../../services/data/archived-food-data.service';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class RecordFormComponent implements OnInit {
  // displaying date
  date: Date = new Date();
  // user data
  user: UserData;
  // nutrition record
  nutritionRecord: NutritionRecord;
  // today's date
  private _today: Date = new Date();
  // food records for nutrition record
  private _foodRecords: FoodRecord[] = [];

  constructor(
    private appService: AppService,
    private dateService: DateService,
    private toastService: ToastService,
    private subscriptionService: SubscriptionService,
    private foodRecordDataService: FoodRecordDataService,
    private archivedFoodDataService: ArchivedFoodDataService,
    private nutritionRecordDataService: NutritionRecordDataService,
  ) { }

  ngOnInit(): void {
    this._subscribeUserData();
  }

  get isToday(): boolean {
    return this.dateService.isSameDate(this._today, this.date);
  }

  /**
   * subscribe user data from app store
   */
  private _subscribeUserData(): void {
    const sub = this.appService.user$
      .subscribe(res => {
        if (res) {
          this.user = res;
          this._getNutritionRecord();
        }
      });

    this.subscriptionService.store('_subscribeUserData', sub);
  }

  /**
   * get nutrition data
   */
  private _getNutritionRecord(): void {
    const sub = this.nutritionRecordDataService
      .getNutritionRecord(this.user.id, this.date)
      .subscribe({
        next: res => {
          this.nutritionRecord = res;

          if (res) {
            this._getFoodRecordsForNutrition();
          }
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
   * update date value and get nutrition record for that date
   * @param date updated date value
   */
  onDateChange(date: Date | string): void {
    this.date = new Date(date);
    this._getNutritionRecord();
  }

  /**
   * create food record
   * @param record record to create
   */
  addFoodRecord(record: FoodRecord): void {
    const sub = this.foodRecordDataService
      .addFoodRecord(record)
      .subscribe({
        next: () => {
          this.nutritionRecord.appendFoodRecord(record);
          this.toastService.open('success', '등록 되었습니다');
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('addFoodRecord', sub);
  }
}
