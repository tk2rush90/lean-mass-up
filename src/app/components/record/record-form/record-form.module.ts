import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordFormComponent } from './record-form.component';
import {BoxModule} from '../../common/box/box.module';
import { RecordFormHeaderComponent } from './record-form-header/record-form-header.component';
import { RecordDateSelectorComponent } from './record-date-selector/record-date-selector.component';
import { RecordInputFormComponent } from './record-input-form/record-input-form.component';
import {FieldLabelModule} from '../../common/field-label/field-label.module';
import {NumberInputModule} from '../../common/number-input/number-input.module';
import {LabeledButtonModule} from '../../common/labeled-button/labeled-button.module';
import { FulfilledNutritionListComponent } from './fulfilled-nutrition-list/fulfilled-nutrition-list.component';
import {NutritionValueModule} from '../../common/nutrition-value/nutrition-value.module';
import {RouterModule} from '@angular/router';
import { FoodSearchInputComponent } from './food-search-input/food-search-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FoodNameModule} from '../../common/food-name/food-name.module';
import {AutoCloserModule} from '../../common/auto-closer/auto-closer.module';
import {AutoPositionerModule} from '../../common/auto-positioner/auto-positioner.module';
import {RenderDetectorModule} from '../../common/render-detector/render-detector.module';
import { RecordListComponent } from './record-list/record-list.component';
import { RecordListItemComponent } from './record-list-item/record-list-item.component';
import {FoodActionsModule} from '../../common/food-actions/food-actions.module';
import {EditActionsModule} from '../../common/edit-actions/edit-actions.module';
import {DeleteActionsModule} from '../../common/delete-actions/delete-actions.module';
import {LogoModule} from '../../common/logo/logo.module';
import {NoListPlaceholderModule} from '../../common/no-list-placeholder/no-list-placeholder.module';
import {SpinnerModule} from '../../common/spinner/spinner.module';



@NgModule({
  declarations: [
    RecordFormComponent,
    RecordFormHeaderComponent,
    RecordDateSelectorComponent,
    RecordInputFormComponent,
    FulfilledNutritionListComponent,
    FoodSearchInputComponent,
    RecordListComponent,
    RecordListItemComponent,
  ],
  exports: [
    RecordFormComponent
  ],
  imports: [
    CommonModule,
    BoxModule,
    FieldLabelModule,
    NumberInputModule,
    LabeledButtonModule,
    NutritionValueModule,
    RouterModule,
    FormsModule,
    FoodNameModule,
    AutoCloserModule,
    AutoPositionerModule,
    RenderDetectorModule,
    ReactiveFormsModule,
    FoodActionsModule,
    EditActionsModule,
    DeleteActionsModule,
    LogoModule,
    NoListPlaceholderModule,
    SpinnerModule
  ]
})
export class RecordFormModule { }
