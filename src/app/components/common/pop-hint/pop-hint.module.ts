import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopHintComponent } from './pop-hint.component';



@NgModule({
  declarations: [PopHintComponent],
  exports: [
    PopHintComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PopHintModule { }
