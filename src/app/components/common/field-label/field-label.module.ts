import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldLabelComponent } from './field-label.component';



@NgModule({
  declarations: [FieldLabelComponent],
  exports: [
    FieldLabelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FieldLabelModule { }
