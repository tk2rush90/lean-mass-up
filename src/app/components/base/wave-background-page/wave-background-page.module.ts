import {NgModule} from '@angular/core';
import {WaveBackgroundPageComponent} from './wave-background-page.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    WaveBackgroundPageComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WaveBackgroundPageComponent,
  ]
})
export class WaveBackgroundPageModule {}
