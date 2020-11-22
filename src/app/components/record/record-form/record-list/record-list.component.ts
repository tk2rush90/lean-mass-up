import {Component, Input, OnInit} from '@angular/core';
import {NutritionRecord} from '../../../../models/data/nutrition-record';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {
  // nutrition record
  @Input() nutritionRecord: NutritionRecord;

  constructor() { }

  ngOnInit(): void {
  }

}
