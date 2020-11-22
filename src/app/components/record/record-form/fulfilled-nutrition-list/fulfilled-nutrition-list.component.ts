import {Component, Input, OnInit} from '@angular/core';
import {NutritionRecord} from '../../../../models/data/nutrition-record';

@Component({
  selector: 'app-fulfilled-nutrition-list',
  templateUrl: './fulfilled-nutrition-list.component.html',
  styleUrls: ['./fulfilled-nutrition-list.component.scss']
})
export class FulfilledNutritionListComponent implements OnInit {
  // nutrition record to display
  @Input() nutritionRecord: NutritionRecord;

  constructor() { }

  ngOnInit(): void {
  }

}
