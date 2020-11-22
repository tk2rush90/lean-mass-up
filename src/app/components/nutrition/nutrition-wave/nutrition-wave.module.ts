import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionWaveComponent } from './nutrition-wave.component';
import {WaveBackgroundModule} from '../../common/wave-background/wave-background.module';
import {FieldLabelModule} from '../../common/field-label/field-label.module';
import { NutritionStatusValueComponent } from './nutrition-status-value/nutrition-status-value.component';
import {AnimatingNumberModule} from '../../common/animating-number/animating-number.module';



@NgModule({
  declarations: [NutritionWaveComponent, NutritionStatusValueComponent],
  exports: [
    NutritionWaveComponent
  ],
  imports: [
    CommonModule,
    WaveBackgroundModule,
    FieldLabelModule,
    AnimatingNumberModule
  ]
})
export class NutritionWaveModule { }
