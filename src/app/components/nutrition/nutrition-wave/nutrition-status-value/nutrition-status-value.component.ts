import {Component, Input, OnInit} from '@angular/core';
import {getNutritionEnLabels, getNutritionKoLabels, NutritionProperties} from '../../../../utils/nutrition.util';

@Component({
  selector: 'app-nutrition-status-value',
  templateUrl: './nutrition-status-value.component.html',
  styleUrls: ['./nutrition-status-value.component.scss']
})
export class NutritionStatusValueComponent implements OnInit {
  // nutrition type
  @Input() type: keyof NutritionProperties;
  // required nutrition value
  @Input() required: number;
  // fulfilled nutrition value
  @Input() fulfilled: number;
  // english labels
  private _en: NutritionProperties = getNutritionEnLabels();
  // korean labels
  private _ko: NutritionProperties = getNutritionKoLabels();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * english label
   */
  get en(): string {
    return this._en[this.type];
  }

  /**
   * korean label
   */
  get ko(): string {
    return this._ko[this.type];
  }
}
