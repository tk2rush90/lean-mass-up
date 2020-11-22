import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import {CalculatorFormModule} from '../../components/calculator/calculator-form/calculator-form.module';
import {FormPageBaseModule} from '../form-page-base/form-page-base.module';



@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    CalculatorFormModule,
    FormPageBaseModule,
  ]
})
export class CalculatorModule { }
