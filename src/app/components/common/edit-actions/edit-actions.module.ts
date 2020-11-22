import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditActionsComponent } from './edit-actions.component';
import {LabeledButtonModule} from '../labeled-button/labeled-button.module';



@NgModule({
  declarations: [EditActionsComponent],
  exports: [
    EditActionsComponent
  ],
  imports: [
    CommonModule,
    LabeledButtonModule
  ]
})
export class EditActionsModule { }
