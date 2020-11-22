import {Component, Input, OnInit} from '@angular/core';
import {FoodData} from '../../../../models/data/food-data';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  // foods
  @Input() foods: FoodData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
