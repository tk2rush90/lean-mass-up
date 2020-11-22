import {Component, Input, OnInit} from '@angular/core';
import {FoodRecord} from '../../../models/data/food-record';
import {FoodData} from '../../../models/data/food-data';

export type FoodNameType = 'data' | 'record';

@Component({
  selector: 'app-food-name',
  templateUrl: './food-name.component.html',
  styleUrls: ['./food-name.component.scss']
})
export class FoodNameComponent implements OnInit {
  // type of food name
  // `'data'` type will show nutrition in additional info area
  // `'record'` type will show quantity in additional info area
  @Input() type: FoodNameType;
  // food data or record
  @Input() food: FoodRecord | FoodData;
  // set `true` to hide additional info
  @Input() hideInfo = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return food as data
   */
  get data(): FoodData {
    return this.food as FoodData;
  }

  /**
   * return food as record
   */
  get record(): FoodRecord {
    return this.food as FoodRecord;
  }
}
