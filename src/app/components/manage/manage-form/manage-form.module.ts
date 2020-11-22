import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFormComponent } from './manage-form.component';
import {BoxModule} from '../../common/box/box.module';
import { FoodInputFormComponent } from './food-input-form/food-input-form.component';
import {FieldLabelModule} from '../../common/field-label/field-label.module';
import {NumberInputModule} from '../../common/number-input/number-input.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LabeledButtonModule} from '../../common/labeled-button/labeled-button.module';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodListItemComponent } from './food-list-item/food-list-item.component';
import {FoodNameModule} from '../../common/food-name/food-name.module';
import {FoodActionsModule} from '../../common/food-actions/food-actions.module';
import {EditActionsModule} from '../../common/edit-actions/edit-actions.module';
import {DeleteActionsModule} from '../../common/delete-actions/delete-actions.module';
import {LogoModule} from '../../common/logo/logo.module';



@NgModule({
  declarations: [ManageFormComponent, FoodInputFormComponent, FoodListComponent, FoodListItemComponent],
  exports: [
    ManageFormComponent
  ],
  imports: [
    CommonModule,
    BoxModule,
    FieldLabelModule,
    NumberInputModule,
    ReactiveFormsModule,
    LabeledButtonModule,
    FoodNameModule,
    FoodActionsModule,
    EditActionsModule,
    DeleteActionsModule,
    LogoModule,
  ]
})
export class ManageFormModule { }
