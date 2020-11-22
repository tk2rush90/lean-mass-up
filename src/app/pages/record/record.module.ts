import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent } from './record.component';
import {RecordFormModule} from '../../components/record/record-form/record-form.module';
import {FormPageBaseModule} from '../form-page-base/form-page-base.module';



@NgModule({
  declarations: [RecordComponent],
  imports: [
    CommonModule,
    RecordFormModule,
    FormPageBaseModule,
  ]
})
export class RecordModule { }
