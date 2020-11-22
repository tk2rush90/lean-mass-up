import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledButtonComponent } from './labeled-button.component';



@NgModule({
  declarations: [LabeledButtonComponent],
  exports: [
    LabeledButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LabeledButtonModule { }
