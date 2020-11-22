import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserData} from '../../../models/data/user-data';
import {Router} from '@angular/router';
import {SubscriptionService} from '../../../services/subscription/subscription.service';
import {ToastService} from '../../common/toast/toast.service';
import {NgModel} from '@angular/forms';
import {ZeroValidator} from '../../../utils/validator.util';
import {UserDataService} from '../../../services/data/user-data.service';
import {StorageService} from '../../../services/common/storage.service';
import {AppService} from '../../../services/common/app.service';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class CalculatorFormComponent implements OnInit, AfterViewInit {
  // weight model
  @ViewChild('weightModel') weightModel: NgModel;
  // weight
  weight = 0;
  // protein ratio
  proteinRatio = 1.5;
  // user data
  private _userData: UserData;
  // set `true` when user data successfully loaded
  private _userDataLoaded = false;
  // weight in lbs
  private _weightInLbs = 0;
  // calories to maintain muscle
  private _muscleMaintenanceCalories = 0;
  // calories to grow muscle
  private _muscleGrowthCalories = 0;
  // required nutrition
  private _requiredFats = 0;
  private _requiredProteins = 0;
  private _requiredCarbohydrates = 0;
  // additional required calories for muscle growth
  private readonly _growthCalories = 300;
  // fat ratio to get required fats from weight
  private readonly _fatRatio = .8;
  // calories per 1g for each nutrition
  private readonly _fatCalories = 9;
  private readonly _proteinCalories = 4;
  private readonly _carbohydrateCalories = 4;
  // calories reference to get required calories to maintain current muscles
  private readonly _caloriesReference = 10;
  // lbs reference per 1kg
  private readonly _poundsReference = 2.20462;

  constructor(
    private router: Router,
    private appService: AppService,
    private toastService: ToastService,
    private storageService: StorageService,
    private userDataService: UserDataService,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this._subscribeUserData();
  }

  ngAfterViewInit(): void {
    this._setInvalidZeroValidator();
  }

  /**
   * get user id from storage
   */
  get userId(): string {
    return this.storageService.userId;
  }

  /**
   * set user data got from the db
   * @param data user data from the db
   */
  set userData(data: UserData) {
    this._userData = data;
    this.weight = data.weight;
    this.proteinRatio = data.proteinRatio;
    this._calculateNutrition();
  }

  get muscleGrowthCalories(): number {
    return this._muscleGrowthCalories;
  }

  get requiredFats(): number {
    return this._requiredFats;
  }

  get requiredProteins(): number {
    return this._requiredProteins;
  }

  get requiredCarbohydrates(): number {
    return this._requiredCarbohydrates;
  }

  get requiredFatsCalories(): number {
    return this._requiredFats * this._fatCalories;
  }

  get requiredProteinsCalories(): number {
    return this._requiredProteins * this._proteinCalories;
  }

  /**
   * set invalid zero validator to weight model to prevent `0` input
   */
  private _setInvalidZeroValidator(): void {
    this.weightModel?.control?.setValidators(ZeroValidator);
  }

  /**
   * subscribe user data from app store
   */
  private _subscribeUserData(): void {
    const sub = this.appService.user$
      .subscribe(res => {
        if (res) {
          this.userData = res;
          this._userDataLoaded = true;
        }
      });

    this.subscriptionService.store('_subscribeUserData', sub);
  }

  /**
   * update weight and calculate nutrition
   * @param value updated value
   */
  onWeightChange(value: number): void {
    this.weight = value;
    this._calculateNutrition();
  }

  /**
   * update protein ratio and calculate nutrition
   * @param value updated value
   */
  onProteinRatioChange(value: number): void {
    this.proteinRatio = value;
    this._calculateNutrition();
  }

  /**
   * calculate nutrition facts
   */
  private _calculateNutrition(): void {
    this._weightInLbs = this.weight * this._poundsReference;
    this._muscleMaintenanceCalories = this._weightInLbs * this._caloriesReference * this.proteinRatio;
    this._muscleGrowthCalories = this.weight === 0 ? 0 : this._muscleMaintenanceCalories + this._growthCalories;
    this._requiredProteins = this.weight * this.proteinRatio;
    this._requiredFats = this.weight * this._fatRatio;
    this._requiredCarbohydrates =
      (this._muscleGrowthCalories - (this.requiredProteinsCalories) - (this.requiredFatsCalories)) / this._carbohydrateCalories;
  }

  /**
   * check the `weight` update user data before go to nutrition page
   */
  onClickNext(): void {
    this.weightModel.control.markAsTouched();

    if (!this.weightModel.hasError('invalidZero')) {
      this._updateUserData();

      if (this._userDataLoaded) {
        this._updateUserToDb();
      } else {
        this._saveUserToDB();
      }
    }
  }

  /**
   * update user data
   */
  private _updateUserData(): void {
    if (!this._userData) {
      this._userData = new UserData();
    }

    this._userData.weight = this.weight;
    this._userData.proteinRatio = this.proteinRatio;
    this._userData.muscleGrowthCalories = this.muscleGrowthCalories;
    this._userData.requiredCarbohydrates = this.requiredCarbohydrates;
    this._userData.requiredProteins = this.requiredProteins;
    this._userData.requiredFats = this.requiredFats;
  }

  /**
   * save user data to indexed db
   */
  private _saveUserToDB(): void {
    const sub = this.userDataService.addUser(this._userData)
      .subscribe({
        next: () => {
          this.appService.user = this._userData;
          this._storeUserId();
          this._toNutrition();
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_saveUserToDB', sub);
  }

  /**
   * update user data from db
   */
  private _updateUserToDb(): void {
    const sub = this.userDataService.updateUser(this._userData)
      .subscribe({
        next: () => {
          this.appService.user = this._userData;
          this._toNutrition();
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_updateUserToDb', sub);
  }

  /**
   * store user id to storage
   */
  private _storeUserId(): void {
    this.storageService.userId = this._userData.id;
  }

  /**
   * go to nutrition page
   */
  private _toNutrition(): void {
    this.router.navigate(['/nutrition']);
  }
}
