import { Injectable } from '@angular/core';
import {DbService} from '../db/db.service';
import {Observable} from 'rxjs';
import {INutritionRecord, NutritionRecord} from '../../models/data/nutrition-record';
import {DateService} from '../common/date.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NutritionRecordDataService {
  // store name
  private readonly _store = 'NutritionRecords';

  constructor(
    private dbService: DbService,
    private dateService: DateService,
  ) { }

  /**
   * transform to formatted date
   * @param date date to format
   */
  private _toFormattedDate(date: Date | string): string {
    return this.dateService.format(date, 'yyyy-MM-dd');
  }

  /**
   * get nutrition record by user id and date
   * @param userId user id
   * @param date date
   */
  getNutritionRecord(userId: string, date: Date = new Date()): Observable<NutritionRecord> {
    const formatted = this._toFormattedDate(date);

    return this.dbService
      .getByIndex<INutritionRecord>(this._store, 'userId, date', [userId, formatted])
      .pipe(map(res => {
        return res ? new NutritionRecord(res) : null;
      }));
  }

  /**
   * save nutrition record
   * @param nutritionRecord nutrition record to save
   */
  saveNutritionRecord(nutritionRecord: NutritionRecord): Observable<void> {
    const serialized = nutritionRecord.serialize();

    return this.dbService.add(this._store, {
      ...serialized,
      date: this._toFormattedDate(serialized.date),
    });
  }

  /**
   * update nutrition record
   * @param nutritionRecord nutrition record to update
   */
  updateNutritionRecord(nutritionRecord: NutritionRecord): Observable<void> {
    const serialized = nutritionRecord.serialize();

    return this.dbService.update(this._store, {
      ...serialized,
      date: this._toFormattedDate(serialized.date),
    });
  }
}
