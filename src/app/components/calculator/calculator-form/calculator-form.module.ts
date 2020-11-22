import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorFormComponent } from './calculator-form.component';
import { WeightInputComponent } from './weight-input/weight-input.component';
import {FieldLabelModule} from '../../common/field-label/field-label.module';
import {BoxModule} from '../../common/box/box.module';
import { ProteinRatioComponent } from './protein-ratio/protein-ratio.component';
import {FormControlBaseModule} from '../../base/form-control-base/form-control-base.module';
import {NumberInputModule} from '../../common/number-input/number-input.module';
import {NumberUnitModule} from '../../common/number-unit/number-unit.module';
import {SliderModule} from '../../common/slider/slider.module';
import {FormsModule} from '@angular/forms';
import { RequiredCaloriesComponent } from './required-calories/required-calories.component';
import {NutritionValueModule} from '../../common/nutrition-value/nutrition-value.module';
import {InlineButtonModule} from '../../common/inline-button/inline-button.module';
import {PopHintModule} from '../../common/pop-hint/pop-hint.module';
import {HasErrorPipeModule} from '../../../pipes/has-error-pipe/has-error-pipe.module';
import {LogoModule} from '../../common/logo/logo.module';



@NgModule({
  declarations: [CalculatorFormComponent, WeightInputComponent, ProteinRatioComponent, RequiredCaloriesComponent],
  exports: [
    CalculatorFormComponent
  ],
  imports: [
    CommonModule,
    FieldLabelModule,
    BoxModule,
    FormControlBaseModule,
    NumberInputModule,
    NumberUnitModule,
    SliderModule,
    FormsModule,
    NutritionValueModule,
    InlineButtonModule,
    PopHintModule,
    HasErrorPipeModule,
    LogoModule,
  ]
})
export class CalculatorFormModule { }
