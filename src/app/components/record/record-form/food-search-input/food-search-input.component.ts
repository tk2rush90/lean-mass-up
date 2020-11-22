import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, Optional, Self} from '@angular/core';
import {FoodData} from '../../../../models/data/food-data';
import {FoodDataService} from '../../../../services/data/food-data.service';
import {SubscriptionService} from '../../../../services/subscription/subscription.service';
import {AppService} from '../../../../services/common/app.service';
import {UserData} from '../../../../models/data/user-data';
import {ToastService} from '../../../common/toast/toast.service';
import {containsText} from '../../../../utils/string.util';
import {FormControlBaseDirective} from '../../../base/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-food-search-input',
  templateUrl: './food-search-input.component.html',
  styleUrls: ['./food-search-input.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class FoodSearchInputComponent extends FormControlBaseDirective<FoodData> implements OnInit {
  // placeholder text
  @Input() placeholder = '';
  // search text
  search = '';
  // input focused state
  focused = false;
  // searching state
  searching = false;
  // filtered foods
  filteredFoods: FoodData[] = [];
  // selected food data
  selectedFood: FoodData;
  // select index for keyboard action
  selectIndex = -1;
  // food data
  private _foods: FoodData[] = [];
  // user data
  private _user: UserData;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    public elementRef: ElementRef<HTMLElement>,
    protected changeDetectorRef: ChangeDetectorRef,
    private appService: AppService,
    private toastService: ToastService,
    private foodDataService: FoodDataService,
    private subscriptionService: SubscriptionService,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
    this._subscribeUserData();
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: FoodData): void {
    this.selectedFood = value;
  }

  /**
   * start searching
   */
  startSearching(): void {
    this.search = this.selectedFood?.name || '';
    this.searching = true;
    this.onSearchChange();
  }

  /**
   * filter food data when search changed
   * @param event input event
   */
  onSearchChange(event?: Event): void {
    // initialize index
    this.selectIndex = -1;
    this.search = (event?.target as HTMLInputElement)?.value || this.search;
    this.filteredFoods = this._foods.filter(item => containsText(item.name, this.search));
  }

  /**
   * move focus down when arrow down
   */
  onArrowDown(): void{
    this.selectIndex = Math.min(this.selectIndex + 1, this.filteredFoods.length - 1);
  }

  /**
   * move focus up when arrow up
   */
  onArrowUp(): void {
    this.selectIndex = Math.max(0, this.selectIndex - 1);
  }

  /**
   * select selected index
   */
  onEnter(): void {
    if (this.selectIndex !== -1) {
      this.setValue(this.filteredFoods[this.selectIndex]);
      this.closeOptions();
    }
  }

  /**
   * subscribe user data
   */
  private _subscribeUserData(): void {
    const sub = this.appService.user$
      .subscribe(res => {
        this._user = res;
        this._getFoods();
      });

    this.subscriptionService.store('_subscribeUserData', sub);
  }

  /**
   * get total food list
   */
  private _getFoods(): void {
    const sub = this.foodDataService
      .getFoods(this._user.id)
      .subscribe({
        next: res => {
          this._foods = res || [];
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_getFoods', sub);
  }

  /**
   * update selected food
   * @param food food data
   */
  onClickOption(food: FoodData): void {
    this.setValue(food);
    this.closeOptions();
  }

  /**
   * close options
   */
  closeOptions(): void {
    this.searching = false;
    this.search = '';
    this.filteredFoods = [];
    this.selectIndex = -1;
  }
}
