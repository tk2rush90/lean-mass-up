import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodNameComponent } from './food-name.component';



@NgModule({
  declarations: [FoodNameComponent],
  exports: [
    FoodNameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FoodNameModule { }
