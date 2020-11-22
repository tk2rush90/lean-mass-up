import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {LogoModule} from '../../components/common/logo/logo.module';



@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LogoModule
  ]
})
export class LandingModule { }
