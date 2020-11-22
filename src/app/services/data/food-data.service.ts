import { Injectable } from '@angular/core';
import {DbService} from '../db/db.service';
import {Observable} from 'rxjs';
import {FoodData, IFoodData} from '../../models/data/food-data';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {
  private readonly _store = 'Foods';

  constructor(
    private dbService: DbService,
  ) { }

  /**
   * get all foods
   * @param userId user id to get all foods
   */
  getFoods(userId: string): Observable<FoodData[]> {
    return this.dbService.getAllByIndex<IFoodData>(this._store, 'userId', userId)
      .pipe(map(res => {
        return res
          .map(item => new FoodData(item))
          .sort((a, b) => {
            return new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf();
          });
      }));
  }

  /**
   * return single food data by id
   * @param id food id
   */
  getFoodById(id: string): Observable<FoodData> {
    return this.dbService.getByKey<IFoodData>(this._store, id)
      .pipe(map(res => {
        return res ? new FoodData(res) : null;
      }));
  }

  /**
   * add food to db
   * @param food food to add
   */
  addFood(food: FoodData): Observable<void> {
    return this.dbService.add(this._store, food.serialized());
  }

  /**
   * update food data
   * @param food food to update
   */
  updateFood(food: FoodData): Observable<void> {
    return this.dbService.update(this._store, food.serialized());
  }

  /**
   * delete food data
   * @param food food to delete
   */
  deleteFood(food: FoodData): Observable<void> {
    return this.dbService.delete(this._store, food.id);
  }
}
