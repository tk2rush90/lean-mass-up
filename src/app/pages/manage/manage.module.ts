import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import {FormPageBaseModule} from '../form-page-base/form-page-base.module';
import {ManageFormModule} from '../../components/manage/manage-form/manage-form.module';



@NgModule({
  declarations: [ManageComponent],
  imports: [
    CommonModule,
    FormPageBaseModule,
    ManageFormModule,
  ]
})
export class ManageModule { }
