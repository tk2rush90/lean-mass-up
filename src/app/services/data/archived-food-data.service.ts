import { Injectable } from '@angular/core';
import {DbService} from '../db/db.service';
import {Observable} from 'rxjs';
import {FoodData, IFoodData} from '../../models/data/food-data';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchivedFoodDataService {
  private readonly _store = 'ArchivedFoods';

  constructor(
    private dbService: DbService,
  ) { }

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
}
