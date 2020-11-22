import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ZeroValidator} from '../../../../utils/validator.util';
import {FoodRecord} from '../../../../models/data/food-record';
import {ToastService} from '../../../common/toast/toast.service';
import {NutritionRecord} from '../../../../models/data/nutrition-record';

@Component({
  selector: 'app-record-input-form',
  templateUrl: './record-input-form.component.html',
  styleUrls: ['./record-input-form.component.scss']
})
export class RecordInputFormComponent implements OnInit {
  // nutrition record
  @Input() nutritionRecord: NutritionRecord;
  // emit when form successfully submitted
  @Output() submitRecord: EventEmitter<FoodRecord> = new EventEmitter<FoodRecord>();
  // form group
  group: FormGroup = new FormGroup({
    food: new FormControl(null, Validators.required),
    quantity: new FormControl(1, ZeroValidator),
  });

  constructor(
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  get foodNotSelected(): boolean {
    return this.group.get('food').hasError('required');
  }

  get zeroQuantity(): boolean {
    return this.group.get('quantity').hasError('invalidZero');
  }

  /**
   * check validation and submit form
   */
  onSubmit(): void {
    this.group.markAllAsTouched();

    if (!this.group.invalid) {
      this._emitSubmitRecord();
      this._resetGroup();
    } else if (this.foodNotSelected) {
      this.toastService.open('error', '식품을 선택해주세요');
    } else if (this.zeroQuantity) {
      this.toastService.open('error', '개수는 0일 수 없습니다');
    }
  }

  /**
   * emit submit record
   */
  private _emitSubmitRecord(): void {
    const {
      food,
      quantity,
    } = this.group.getRawValue();

    const record = new FoodRecord({
      nutritionRecordId: this.nutritionRecord?.id,
      foodId: food.id,
      quantity,
    });

    record.food = food;

    this.submitRecord.emit(record);
  }

  /**
   * reset form group
   */
  private _resetGroup(): void {
    this.group.reset({
      food: null,
      quantity: 1,
    });
  }
}
