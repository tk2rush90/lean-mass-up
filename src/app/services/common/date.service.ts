import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  // date pipe
  private _datePipe: DatePipe = new DatePipe('en-US');

  constructor() { }

  /**
   * to formatted date
   * @param date date to format
   * @param format format string
   */
  format(date: Date | string | number, format: string): string {
    return this._datePipe.transform(date, format);
  }

  /**
   * return `true` when date is same date
   * @param date1 date 1
   * @param date2 date 2
   */
  isSameDate(date1: Date | string | number, date2: Date | string | number): boolean {
    return this.format(date1, 'yyyyMMdd') === this.format(date2, 'yyyyMMdd');
  }
}
