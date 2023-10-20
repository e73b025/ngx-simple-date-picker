import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgxDatePickerInputModule
} from '../../projects/ngx-simple-date-picker/src/lib/input/ngx-date-picker-input.module';
import { NgxDatePickerUiModule } from '../../projects/ngx-simple-date-picker/src/lib/ui/ngx-date-picker-ui.module';


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxDatePickerUiModule,
        NgxDatePickerInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
