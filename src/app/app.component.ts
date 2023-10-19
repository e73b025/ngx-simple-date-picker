import { Component } from '@angular/core';
import {DateSelection} from "./ngx-date-picker/ngx-date-picker.component";
import {
  getInputConfigDefaults,
  NgxDatePickerInputConfig
} from "./ngx-date-picker-input/ngx-date-picker-input.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-date-picker Demo';
  dateSelection: DateSelection | undefined;

  datePickerConfig: NgxDatePickerInputConfig = Object.assign(getInputConfigDefaults(), {
    darkMode: false,
    rangeMode: false,
    datePresentationFormat: 'dd/MMMM/YYYY'
  });

  onDateChanges() {
    console.log(this.dateSelection);
  }
}
