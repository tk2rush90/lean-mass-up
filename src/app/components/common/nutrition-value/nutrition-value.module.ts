import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionValueComponent } from './nutrition-value.component';
import {FieldLabelModule} from '../field-label/field-label.module';



@NgModule({
  declarations: [NutritionValueComponent],
  exports: [
    NutritionValueComponent
  ],
  imports: [
    CommonModule,
    FieldLabelModule,
  ]
})
export class NutritionValueModule { }
