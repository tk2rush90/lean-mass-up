import {Component, Input, OnInit} from '@angular/core';
import {FoodData} from '../../../../models/data/food-data';
import {FoodDataService} from '../../../../services/data/food-data.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {ToastService} from '../../../common/toast/toast.service';
import {ArchivedFoodDataService} from '../../../../services/data/archived-food-data.service';
import {combineLatest} from 'rxjs';

export type FoodListItemViewType = 'read' | 'edit' | 'delete';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class FoodListItemComponent implements OnInit {
  // food data
  @Input() food: FoodData;
  // all foods to check duplicated validation
  @Input() foods: FoodData[] = [];
  // list item view type
  viewType: FoodListItemViewType = 'read';

  constructor(
    private toastService: ToastService,
    private foodDataService: FoodDataService,
    private subscriptionService: SubscriptionService,
    private archivedFoodDataService: ArchivedFoodDataService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * change food item view type
   * @param type view type
   */
  changeViewType(type: FoodListItemViewType): void {
    this.viewType = type;
  }

  /**
   * edit food data from foods db and archived foods
   * @param food food to edit
   */
  editFood(food: FoodData): void {
    const sub = combineLatest([
      this.foodDataService.updateFood(food),
      this.archivedFoodDataService.updateFood(food),
    ]).subscribe({
      next: () => {
        this.toastService.open('success', '수정 되었습니다');
        this._updateFoodList(food);
        this.changeViewType('read');
      },
      error: err => {
        this.toastService.open('error', err.message);
      },
    });

    this.subscriptionService.store('editFood', sub);
  }

  /**
   * update food list with updated data
   * @param food updated food data
   */
  private _updateFoodList(food: FoodData): void {
    const found = this.foods.find(item => item.id === food.id);

    if (found) {
      found.update(food);
    }
  }

  /**
   * delete current food item only from food db
   */
  deleteFood(): void {
    const sub = this.foodDataService
      .deleteFood(this.food)
      .subscribe({
        next: () => {
          this.toastService.open('success', '삭제되었습니다');
          this._removeFoodFromList();
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('deleteFood', sub);
  }

  /**
   * remove current food from list after deleted
   */
  private _removeFoodFromList(): void {
    const index = this.foods.findIndex(item => item.id === this.food.id);

    if (index !== -1) {
      this.foods.splice(index, 1);
    }
  }
}
