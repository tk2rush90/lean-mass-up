import {FoodData} from './food-data';
import {randomKey} from '../../utils/random.util';

export interface IFoodRecord {
  // unique record id
  id?: string;
  // unique nutrition record id
  nutritionRecordId: string;
  // food id
  foodId: string;
  // quantity
  quantity: number;
  // created on
  createdOn?: Date | string;
}

export class FoodRecord implements IFoodRecord {
  // unique record id
  id: string;
  // unique nutrition record id
  nutritionRecordId: string;
  // food id
  foodId: string;
  // quantity
  quantity: number;
  // total carbohydrates
  carbohydrates: number;
  // total proteins
  proteins: number;
  // total fats
  fats: number;
  // created on
  createdOn: Date | string;
  // food data
  private _food: FoodData;

  constructor(data?: IFoodRecord) {
    this.id = data?.id || randomKey();
    this.nutritionRecordId = data?.nutritionRecordId;
    this.foodId = data?.foodId;
    this.quantity = data?.quantity || 0;
    this.createdOn = data?.createdOn ? new Date(data?.createdOn) : new Date();
    this._calculateNutrition();
  }

  set food(food: FoodData) {
    this._food = food;
    this._calculateNutrition();
  }

  get food(): FoodData {
    return this._food;
  }

  /**
   * update quantity of food
   * @param quantity quantity to update
   */
  updateQuantity(quantity: number): void {
    this.quantity = quantity;
    this._calculateNutrition();
  }

  /**
   * calculate nutrition for recorded food
   */
  private _calculateNutrition(): void {
    this.carbohydrates = (this.food?.carbohydrates * this.quantity) || 0;
    this.proteins = (this.food?.proteins * this.quantity) || 0;
    this.fats = (this.food?.fats * this.quantity) || 0;
  }

  /**
   * return serialized data
   */
  serialized(): IFoodRecord {
    return {
      id: this.id,
      nutritionRecordId: this.nutritionRecordId,
      foodId: this.foodId,
      quantity: this.quantity,
    };
  }
}
