import {FoodRecord} from './food-record';
import {randomKey} from '../../utils/random.util';
import {UserData} from './user-data';

export interface INutritionRecord {
  // unique record id
  id?: string;
  // unique user id
  userId: string;
  // record date
  date: Date | string;
  // weight
  weight: number;
  // required carbohydrates
  requiredCarbohydrates: number;
  // required protein
  requiredProteins: number;
  // required fats
  requiredFats: number;
}

export class NutritionRecord implements INutritionRecord {
  // unique record id
  id: string;
  // unique user id
  userId: string;
  // record date
  date: Date | string;
  // weight
  weight: number;
  // required carbohydrates
  requiredCarbohydrates: number;
  // required protein
  requiredProteins: number;
  // required fats
  requiredFats: number;
  // fulfilled carbohydrates
  fulfilledCarbohydrates: number;
  // fulfilled protein
  fulfilledProteins: number;
  // fulfilled fats
  fulfilledFats: number;
  // recorded foods
  private _foodRecords: FoodRecord[] = [];

  constructor(data?: INutritionRecord) {
    this.id = data?.id || randomKey();
    this.userId = data?.userId;
    this.date = data?.date ? new Date(data.date) : new Date();
    this.weight = data?.weight;
    this.requiredCarbohydrates = data?.requiredCarbohydrates;
    this.requiredProteins = data?.requiredProteins;
    this.requiredFats = data?.requiredFats;
  }

  /**
   * set food records data of the day
   * @param records list of food record
   */
  set foodRecords(records: FoodRecord[]) {
    this._foodRecords = records || [];
    this.calculateFulfilledNutrition();
  }

  /**
   * return food records
   */
  get foodRecords(): FoodRecord[] {
    return this._foodRecords;
  }

  /**
   * append a single food record
   * @param record record to append
   */
  appendFoodRecord(record: FoodRecord): void {
    this._foodRecords.unshift(record);
    this.calculateFulfilledNutrition();
  }

  /**
   * remove food record
   * @param record record to remove
   */
  removeFoodRecord(record: FoodRecord): void {
    const index = this._foodRecords.findIndex(item => item.id === record.id);

    if (index !== -1) {
      this._foodRecords.splice(index, 1);
      this.calculateFulfilledNutrition();
    }
  }

  /**
   * calculate fulfilled nutrition with foods
   */
  calculateFulfilledNutrition(): void {
    this.fulfilledCarbohydrates = 0;
    this.fulfilledProteins = 0;
    this.fulfilledFats = 0;

    this._foodRecords.forEach(food => {
      this.fulfilledCarbohydrates += food.carbohydrates;
      this.fulfilledProteins += food.proteins;
      this.fulfilledFats += food.fats;
    });
  }

  /**
   * update required nutrition with user data
   * @param user user data
   */
  updateUserData(user: UserData): void {
    this.userId = user.id;
    this.weight = user.weight;
    this.requiredCarbohydrates = user.requiredCarbohydrates;
    this.requiredProteins = user.requiredProteins;
    this.requiredFats = user.requiredFats;
  }

  /**
   * return serialized value
   */
  serialize(): INutritionRecord {
    return {
      id: this.id,
      userId: this.userId,
      date: this.date,
      weight: this.weight,
      requiredCarbohydrates: this.requiredCarbohydrates,
      requiredProteins: this.requiredProteins,
      requiredFats: this.requiredFats,
    };
  }
}
