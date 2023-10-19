import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxDatePickerModule} from "./ngx-date-picker/ngx-date-picker.module";
import {NgxDatePickerInputModule} from "./ngx-date-picker-input/ngx-date-picker-input.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxDatePickerModule,
        NgxDatePickerInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
