import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionActionsComponent } from './nutrition-actions.component';
import {InlineButtonModule} from '../../common/inline-button/inline-button.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [NutritionActionsComponent],
  exports: [
    NutritionActionsComponent
  ],
  imports: [
    CommonModule,
    InlineButtonModule,
    RouterModule
  ]
})
export class NutritionActionsModule { }
