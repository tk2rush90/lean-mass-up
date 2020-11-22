import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateService} from '../../../../services/common/date.service';

@Component({
  selector: 'app-record-date-selector',
  templateUrl: './record-date-selector.component.html',
  styleUrls: ['./record-date-selector.component.scss']
})
export class RecordDateSelectorComponent implements OnInit {
  /**
   * set selected date to display
   * @param date date
   */
  @Input() set date(date: Date | string) {
    this._date = new Date(date);
    this._setHasNextState();
  }
  // emit when the enabled arrow clicked
  @Output() dateChange: EventEmitter<Date | string> = new EventEmitter<Date | string>();
  // has next state
  hasNext = false;
  // today's date
  today = new Date();
  // selected date
  private _date: Date;

  constructor(
    private dateService: DateService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * return date value
   */
  get date(): Date | string {
    return this._date;
  }

  /**
   * set has next state to `true` when `_date` and `today` are different
   */
  private _setHasNextState(): void {
    this.hasNext = !this.dateService.isSameDate(this._date, this.today);
  }

  /**
   * emit `dateChange` with next day
   */
  toNextDay(): void {
    if (this.hasNext) {
      const now = new Date(this.date);
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

      this.dateChange.emit(date);
    }
  }

  /**
   * emit `dateChange` with previous day
   */
  toPreviousDay(): void {
    const now = new Date(this.date);
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

    this.dateChange.emit(date);
  }

  /**
   * emit `dateChange` with taday's date
   */
  toToday(): void {
    this.dateChange.emit(new Date());
  }
}
