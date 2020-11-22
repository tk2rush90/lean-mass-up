import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastOutletComponent } from './toast-outlet/toast-outlet.component';
import { ToastItemComponent } from './toast-item/toast-item.component';
import { ToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';



@NgModule({
  declarations: [ToastOutletComponent, ToastItemComponent, ToastWrapperComponent],
  exports: [
    ToastOutletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ToastModule { }
