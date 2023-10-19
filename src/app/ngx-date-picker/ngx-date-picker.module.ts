import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgxDatePickerComponent} from "./ngx-date-picker.component";

@NgModule({
  declarations: [
    NgxDatePickerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    NgxDatePickerComponent
  ]
})
export class NgxDatePickerModule {

}
