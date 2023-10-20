import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatePickerUiComponent } from './ngx-date-picker-ui.component';

@NgModule({
  declarations: [
    NgxDatePickerUiComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    NgxDatePickerUiComponent
  ]
})
export class NgxDatePickerUiModule {

}
