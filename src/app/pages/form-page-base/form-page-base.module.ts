import {NgModule} from '@angular/core';
import {LogoModule} from '../../components/common/logo/logo.module';
import {WaveBackgroundModule} from '../../components/common/wave-background/wave-background.module';
import {WaveBackgroundPageModule} from '../../components/base/wave-background-page/wave-background-page.module';

@NgModule({
  imports: [
    LogoModule,
    WaveBackgroundModule,
    WaveBackgroundPageModule,
  ],
  exports: [
    LogoModule,
    WaveBackgroundModule,
    WaveBackgroundPageModule,
  ]
})
export class FormPageBaseModule {}
