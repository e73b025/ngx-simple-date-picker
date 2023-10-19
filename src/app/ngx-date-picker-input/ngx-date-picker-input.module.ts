import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgxDatePickerInputComponent} from "./ngx-date-picker-input.component";
import {NgxDatePickerModule} from "../ngx-date-picker/ngx-date-picker.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NgxDatePickerInputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgxDatePickerModule,
    FormsModule
  ],
  exports: [
    NgxDatePickerInputComponent
  ]
})
export class NgxDatePickerInputModule {

}
