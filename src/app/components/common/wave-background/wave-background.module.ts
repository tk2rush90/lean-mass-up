import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaveBackgroundComponent } from './wave-background.component';



@NgModule({
  declarations: [WaveBackgroundComponent],
  exports: [
    WaveBackgroundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WaveBackgroundModule { }
