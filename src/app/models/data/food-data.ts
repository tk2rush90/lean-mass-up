import {randomKey} from '../../utils/random.util';

export interface IFoodData {
  // unique food id
  id?: string;
  // user id
  userId: string;
  // food name
  name: string;
  // carbohydrates
  carbohydrates: number;
  // proteins
  proteins: number;
  // fats
  fats: number;
  // created on
  createdOn?: Date | string;
}

export class FoodData implements IFoodData {
  // unique food id
  id: string;
  // user id
  userId: string;
  // food name
  name: string;
  // carbohydrates
  carbohydrates: number;
  // proteins
  proteins: number;
  // fats
  fats: number;
  // created on
  createdOn: Date | string;

  constructor(data?: IFoodData) {
    this.id = data?.id || randomKey();
    this.userId = data?.userId;
    this.name = data?.name;
    this.carbohydrates = data?.carbohydrates || 0;
    this.proteins = data?.proteins || 0;
    this.fats = data?.fats || 0;
    this.createdOn = data?.createdOn ? new Date(data.createdOn) : new Date();
  }

  /**
   * update food data
   * @param data updated data
   */
  update(data: IFoodData): void {
    this.userId = data?.userId;
    this.name = data?.name;
    this.carbohydrates = data?.carbohydrates || 0;
    this.proteins = data?.proteins || 0;
    this.fats = data?.fats || 0;
  }

  /**
   * return serialized data
   */
  serialized(): IFoodData {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      carbohydrates: this.carbohydrates,
      proteins: this.proteins,
      fats: this.fats,
      createdOn: this.createdOn,
    };
  }
}
