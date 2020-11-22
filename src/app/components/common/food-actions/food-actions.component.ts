import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-food-actions',
  templateUrl: './food-actions.component.html',
  styleUrls: ['./food-actions.component.scss']
})
export class FoodActionsComponent implements OnInit {
  // emit when edit button clicked
  @Output() editClick: EventEmitter<void> = new EventEmitter<void>();
  // emit when delete button clicked
  @Output() deleteClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
