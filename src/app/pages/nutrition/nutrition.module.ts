import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionComponent } from './nutrition.component';
import {LogoModule} from '../../components/common/logo/logo.module';
import {NutritionWaveModule} from '../../components/nutrition/nutrition-wave/nutrition-wave.module';
import {NutritionActionsModule} from '../../components/nutrition/nutrition-actions/nutrition-actions.module';



@NgModule({
  declarations: [NutritionComponent],
  imports: [
    CommonModule,
    LogoModule,
    NutritionWaveModule,
    NutritionActionsModule
  ]
})
export class NutritionModule { }
