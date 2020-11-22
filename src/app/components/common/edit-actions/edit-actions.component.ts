import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-actions',
  templateUrl: './edit-actions.component.html',
  styleUrls: ['./edit-actions.component.scss']
})
export class EditActionsComponent implements OnInit {
  // emit when cancel button clicked
  @Output() cancelClick: EventEmitter<void> = new EventEmitter();
  // emit when edit button clicked
  @Output() editClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
