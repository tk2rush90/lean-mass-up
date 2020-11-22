import {Component, Input, OnInit} from '@angular/core';
import {getNutritionColorSet, getNutritionEnLabels, getNutritionKoLabels, NutritionProperties} from '../../../utils/nutrition.util';

export type NutritionDisplayType = 'required' | 'fulfilled';

@Component({
  selector: 'app-nutrition-value',
  templateUrl: './nutrition-value.component.html',
  styleUrls: ['./nutrition-value.component.scss']
})
export class NutritionValueComponent implements OnInit {
  // set nutrition display type
  // if type is `'fulfilled'`, the `fulfilledNutrition` field is required
  @Input() type: NutritionDisplayType;
  // nutrition type
  @Input() nutritionType: keyof NutritionProperties;
  /**
   * set fulfilled nutrition
   * only available when display type is `'fulfilled'`
   * @param value value to set
   */
  @Input() set fulfilledNutrition(value: number) {
    this._fulfilledNutrition = value || 0;
  }

  /**
   * set required nutrition
   * @param value value to set
   */
  @Input() set requiredNutrition(value: number) {
    this._requiredNutrition = value || 0;
  }
  // color map for each nutrition
  private _nutritionColors: NutritionProperties = getNutritionColorSet();
  // english label
  private _en: NutritionProperties = getNutritionEnLabels();
  // korean label
  private _ko: NutritionProperties = getNutritionKoLabels();
  // required nutrition
  private _requiredNutrition = 0;
  // fulfilled nutrition
  private _fulfilledNutrition = 0;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * return color hex according to nutrition
   */
  get color(): string {
    return this._nutritionColors[this.nutritionType];
  }

  get requiredNutrition(): number {
    return this._requiredNutrition;
  }

  get fulfilledNutrition(): number {
    return this._fulfilledNutrition;
  }

  /**
   * return english label
   */
  get en(): string {
    const en = this._en[this.nutritionType];

    switch (this.type) {
      case 'required': {
        return `REQUIRED ${en}`;
      }

      case 'fulfilled': {
        return en;
      }
    }
  }

  /**
   * return korean label
   */
  get ko(): string {
    const ko = this._ko[this.nutritionType];

    switch (this.type) {
      case 'required': {
        return `필수 ${ko}`;
      }

      case 'fulfilled': {
        return ko;
      }
    }
  }
}
