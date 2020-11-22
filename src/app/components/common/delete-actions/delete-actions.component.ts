import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-delete-actions',
  templateUrl: './delete-actions.component.html',
  styleUrls: ['./delete-actions.component.scss']
})
export class DeleteActionsComponent implements OnInit {
  // emit when cancel button clicked
  @Output() cancelClick: EventEmitter<void> = new EventEmitter<void>();
  // emit when delete button clicked
  @Output() deleteClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
