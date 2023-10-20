import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxDatePickerInputComponent } from './ngx-date-picker-input.component';
import { NgxDatePickerUiModule } from "../ui/ngx-date-picker-ui.module";

@NgModule({
  declarations: [
    NgxDatePickerInputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDatePickerUiModule
  ],
  exports: [
    NgxDatePickerInputComponent
  ]
})
export class NgxDatePickerInputModule {

}
