import { Component } from '@angular/core';

import { NgxDatePickerSelection } from '../../projects/ngx-simple-date-picker/src/lib/ui/ngx-date-picker-ui.component';
import {
  getInputConfigDefaults,
  NgxDatePickerInputConfig
} from '../../projects/ngx-simple-date-picker/src/lib/input/ngx-date-picker-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-date-picker Demo';
  dateSelection: NgxDatePickerSelection | undefined;

  datePickerConfig: NgxDatePickerInputConfig = Object.assign(getInputConfigDefaults(), {
    darkMode: false,
    rangeMode: false,
    datePresentationFormat: 'dd/MMMM/YYYY'
  });

  onDateChanges() {
    console.log(this.dateSelection);
  }
}
