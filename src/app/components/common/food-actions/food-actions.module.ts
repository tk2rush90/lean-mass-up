import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodActionsComponent } from './food-actions.component';
import {InlineButtonModule} from '../inline-button/inline-button.module';



@NgModule({
  declarations: [FoodActionsComponent],
  exports: [
    FoodActionsComponent
  ],
  imports: [
    CommonModule,
    InlineButtonModule
  ]
})
export class FoodActionsModule { }
