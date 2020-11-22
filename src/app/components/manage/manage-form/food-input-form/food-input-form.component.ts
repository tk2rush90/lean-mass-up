import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FoodData, IFoodData} from '../../../../models/data/food-data';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {TextValidator} from '../../../../utils/validator.util';
import {ToastService} from '../../../common/toast/toast.service';
import {AppService} from '../../../../services/common/app.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {UserData} from '../../../../models/data/user-data';

@Component({
  selector: 'app-food-input-form',
  templateUrl: './food-input-form.component.html',
  styleUrls: ['./food-input-form.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class FoodInputFormComponent implements OnInit {
  /**
   * set food data
   * @param food food
   */
  @Input() set food(food: FoodData) {
    this._food = food;
    this._patchGroupValues();
  }
  // set `true` to make it as edit mode
  @Input() editMode = false;
  // food list already input
  @Input() foods: FoodData[] = [];
  // emit when cancel button clicked on edit mode
  @Output() cancelClick: EventEmitter<void> = new EventEmitter();
  // emit when add button clicked with valid form data
  @Output() submitFood: EventEmitter<FoodData> = new EventEmitter<FoodData>();
  // form group
  group: FormGroup;
  // food data
  private _food: FoodData;
  // user data
  private _user: UserData;

  constructor(
    private appService: AppService,
    private toastService: ToastService,
    private subscriptionService: SubscriptionService,
  ) {
    this._initializeFormGroup();
  }

  ngOnInit(): void {
    this._subscribeUserData();
  }

  get nameRequired(): boolean {
    return this.group.get('name').hasError('invalidText');
  }

  get nameDuplicated(): boolean {
    return this.group.get('name').hasError('duplicated');
  }

  /**
   * subscribe user data
   */
  private _subscribeUserData(): void {
    const sub = this.appService.user$
      .subscribe(res => this._user = res);

    this.subscriptionService.store('_subscribeUserData', sub);
  }

  /**
   * initialize form group
   */
  private _initializeFormGroup(): void {
    this.group = new FormGroup({
      name: new FormControl('', [
        TextValidator,
        this._nameDuplicationValidator,
      ]),
      carbohydrates: new FormControl(0),
      proteins: new FormControl(0),
      fats: new FormControl(0),
    });
  }

  /**
   * patch group values with food data
   */
  private _patchGroupValues(): void {
    this.group.patchValue({
      name: this._food?.name || '',
      carbohydrates: this._food?.carbohydrates || 0,
      proteins: this._food?.proteins || 0,
      fats: this._food?.fats || 0,
    });
  }

  /**
   * handle submit event
   */
  onSubmit(): void {
    this.group.markAllAsTouched();

    if (this.group.valid) {
      this._emitSubmitFood();
      this._resetGroup();
    } else if (this.nameRequired) {
      this.toastService.open('error', '이름을 입력해주세요');
    } else if (this.nameDuplicated) {
      this.toastService.open('error', '이미 존재하는 이름입니다');
    }
  }

  /**
   * emit `submitFood` emitter with food data
   */
  private _emitSubmitFood(): void {
    const {
      name,
      carbohydrates,
      proteins,
      fats,
    }: IFoodData = this.group.getRawValue();

    this.submitFood.emit(new FoodData({
      id: this._food?.id,
      userId: this._user.id,
      name,
      carbohydrates,
      proteins,
      fats,
    }));
  }

  /**
   * reset form group
   */
  private _resetGroup(): void {
    this.group.reset({
      name: '',
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
    });
  }

  /**
   * validator for food name duplication
   * set `duplicated` error when name is duplicated
   * @param control abstract control
   */
  private _nameDuplicationValidator = (control: AbstractControl): any | null => {
    if (control.value && this.foods.length > 0) {
      if (this._findDuplicatedFood(control)) {
        return {
          duplicated: true,
        };
      }
    }
  }

  /**
   * find duplicated food item without id
   */
  private _findDuplicatedFood(control: AbstractControl): FoodData {
    return this.foods.find(item => {
      return item.id !== this._food?.id
        && item.name === control.value;
    });
  }
}
