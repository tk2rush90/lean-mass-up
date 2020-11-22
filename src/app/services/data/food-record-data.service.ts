import { Injectable } from '@angular/core';
import {DbService} from '../db/db.service';
import {FoodRecord, IFoodRecord} from '../../models/data/food-record';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodRecordDataService {
  private readonly _store = 'FoodRecords';

  constructor(
    private dbService: DbService,
  ) { }

  /**
   * add food record to db
   * @param record record
   */
  addFoodRecord(record: FoodRecord): Observable<void> {
    return this.dbService.add(this._store, record.serialized());
  }

  /**
   * get food records with nutrition record id
   * @param nutritionRecordId nutrition record id to get food records
   */
  getFoodRecords(nutritionRecordId: string): Observable<FoodRecord[]> {
    return this.dbService.getAllByIndex<IFoodRecord>(this._store, 'nutritionRecordId', nutritionRecordId)
      .pipe(map(res => {
        return res
          .map(item => new FoodRecord(item))
          .sort((a, b) => {
            return new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf();
          });
      }));
  }

  /**
   * update food record
   * @param record record to update
   * @param quantity quantity to update
   */
  updateFoodRecordQuantity(record: FoodRecord, quantity: number): Observable<void> {
    return this.dbService.update(this._store, {
      ...record.serialized(),
      quantity,
    });
  }

  /**
   * delete food record from db
   * @param record record to delete
   */
  deleteFoodRecord(record: FoodRecord): Observable<void> {
    return this.dbService.delete(this._store, record.id);
  }
}
