import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberUnitComponent } from './number-unit.component';



@NgModule({
  declarations: [NumberUnitComponent],
  exports: [
    NumberUnitComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NumberUnitModule { }
