import {Component, Input, OnInit} from '@angular/core';
import {FoodRecord} from '../../../../models/data/food-record';
import {FoodRecordDataService} from '../../../../services/data/food-record-data.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ZeroValidator} from '../../../../utils/validator.util';
import {ToastService} from '../../../common/toast/toast.service';
import {NutritionRecord} from '../../../../models/data/nutrition-record';

export type RecordListItemViewType = 'read' | 'edit' | 'delete';

@Component({
  selector: 'app-record-list-item',
  templateUrl: './record-list-item.component.html',
  styleUrls: ['./record-list-item.component.scss']
})
export class RecordListItemComponent implements OnInit {
  // food record
  @Input() record: FoodRecord;
  // set `true` to make record as read-only
  @Input() readOnly = false;
  // nutrition record
  @Input() nutritionRecord: NutritionRecord;
  // view type
  viewType: RecordListItemViewType = 'read';
  // edit group
  group: FormGroup = new FormGroup({
    quantity: new FormControl(0, ZeroValidator),
  });

  constructor(
    private toastService: ToastService,
    private subscriptionService: SubscriptionService,
    private foodRecordDataService: FoodRecordDataService,
  ) { }

  ngOnInit(): void {
  }

  get zeroQuantity(): boolean {
    return this.group.get('quantity').hasError('invalidZero');
  }

  /**
   * change view type
   * @param type type to change
   */
  changeViewType(type: RecordListItemViewType): void {
    this.viewType = type;

    if (this.viewType === 'edit') {
      this.group.reset({
        quantity: this.record.quantity || 0,
      });
    }
  }

  /**
   * check validation and update
   */
  onEditClick(): void {
    this.group.markAllAsTouched();

    if (this.group.valid) {
      this.updateFoodQuantity();
    } else if (this.zeroQuantity) {
      this.toastService.open('error', '개수는 0일 수 없습니다');
    }
  }

  /**
   * update food quantity
   */
  updateFoodQuantity(): void {
    const {quantity} = this.group.getRawValue();

    const sub = this.foodRecordDataService
      .updateFoodRecordQuantity(this.record, quantity)
      .subscribe({
        next: () => {
          this.viewType = 'read';
          this.record.updateQuantity(quantity);
          this.nutritionRecord.calculateFulfilledNutrition();
          this.toastService.open('success', '수정 되었습니다');
        },
        error: () => {
          this.toastService.open('error', '수정에 실패했습니다');
        },
      });

    this.subscriptionService.store('updateFoodQuantity', sub);
  }

  /**
   * delete food from db
   */
  deleteFood(): void {
    const sub = this.foodRecordDataService
      .deleteFoodRecord(this.record)
      .subscribe({
        next: () => {
          this.toastService.open('success', '삭제 되었습니다');
          this.nutritionRecord.removeFoodRecord(this.record);
        },
        error: () => {
          this.toastService.open('error', '삭제에 실패했습니다');
        },
      });

    this.subscriptionService.store('deleteFood', sub);
  }
}
