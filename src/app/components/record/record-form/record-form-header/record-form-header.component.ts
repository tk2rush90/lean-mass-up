import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-record-form-header',
  templateUrl: './record-form-header.component.html',
  styleUrls: ['./record-form-header.component.scss']
})
export class RecordFormHeaderComponent implements OnInit {
  // weight of user
  @Input() weight: number;
  // date to display
  @Input() date: Date | string;
  // emit when date changed
  @Output() dateChange: EventEmitter<Date | string> = new EventEmitter<Date | string>();

  constructor() { }

  ngOnInit(): void {
  }

}
