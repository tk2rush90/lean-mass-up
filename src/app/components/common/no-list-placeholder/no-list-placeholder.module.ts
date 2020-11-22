import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoListPlaceholderComponent } from './no-list-placeholder.component';



@NgModule({
  declarations: [NoListPlaceholderComponent],
  exports: [
    NoListPlaceholderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NoListPlaceholderModule { }
