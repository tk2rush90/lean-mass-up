import { Component, OnInit } from '@angular/core';
import {FoodDataService} from '../../../services/data/food-data.service';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {AppService} from '../../../services/common/app.service';
import {UserData} from '../../../models/data/user-data';
import {FoodData} from '../../../models/data/food-data';
import {ToastService} from '../../common/toast/toast.service';
import {ArchivedFoodDataService} from '../../../services/data/archived-food-data.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-manage-form',
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class ManageFormComponent implements OnInit {
  // user data
  user: UserData;
  // food data list
  foods: FoodData[] = [];

  constructor(
    private appService: AppService,
    private toastService: ToastService,
    private foodDataService: FoodDataService,
    private subscriptionService: SubscriptionService,
    private archivedFoodDataService: ArchivedFoodDataService,
  ) { }

  ngOnInit(): void {
    this._subscribeUserData();
  }

  /**
   * subscribe user data
   */
  private _subscribeUserData(): void {
    const sub = this.appService.user$
      .subscribe(res => {
        this.user = res;
        this._getAllFoods();
      });

    this.subscriptionService.store('_subscribeUserData', sub);
  }

  /**
   * get all foods from db
   */
  private _getAllFoods(): void {
    const sub = this.foodDataService
      .getFoods(this.user.id)
      .subscribe({
        next: res => {
          this.foods = res || [];
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_getAllFoods', sub);
  }

  /**
   * add new food data to foods and archived db
   * @param food food to add
   */
  addNewFood(food: FoodData): void {
    const sub = combineLatest([
      this.foodDataService.addFood(food),
      this.archivedFoodDataService.addFood(food),
    ]).subscribe({
      next: () => {
        this.foods.unshift(food);
        this.toastService.open('success', '추가 되었습니다');
      },
      error: err => {
        this.toastService.open('error', err.message);
      },
    });

    this.subscriptionService.store('addNewFood', sub);
  }
}
