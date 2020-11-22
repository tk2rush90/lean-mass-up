import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteActionsComponent } from './delete-actions.component';
import {LabeledButtonModule} from '../labeled-button/labeled-button.module';



@NgModule({
  declarations: [DeleteActionsComponent],
  exports: [
    DeleteActionsComponent
  ],
  imports: [
    CommonModule,
    LabeledButtonModule
  ]
})
export class DeleteActionsModule { }
