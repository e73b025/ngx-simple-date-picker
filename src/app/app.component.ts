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

  dateSelection2: NgxDatePickerSelection | undefined;

  demo2Config: NgxDatePickerInputConfig = Object.assign(getInputConfigDefaults(), {
    rangeMode: false,
  });

  demo3Config: NgxDatePickerInputConfig = Object.assign(getInputConfigDefaults(), {
    darkMode: true
  });

  demo4Config: NgxDatePickerInputConfig = Object.assign(getInputConfigDefaults(), {
    datePresentationFormat: 'dd/MM/yyyy'
  });

  dateSelection5: NgxDatePickerSelection | undefined;

  dateSelection6: NgxDatePickerSelection | undefined;

  onDateChanges() {
    console.log(this.dateSelection);
  }
}
