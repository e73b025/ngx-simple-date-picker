import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { DatePipe } from '@angular/common';
import { getConfigDefaults, NgxDatePickerConfig, NgxDatePickerSelection } from "../ui/ngx-date-picker-ui.component";

@Component({
  selector: 'ngx-date-picker-input',
  templateUrl: './ngx-date-picker-input.component.html',
  styleUrls: ['./ngx-date-picker-input.component.scss']
})
export class NgxDatePickerInputComponent implements OnInit {
  @Input('date')
  date: NgxDatePickerSelection | undefined;

  // Allow user to subscribe to date changes using output
  @Output('dateChange')
  dateEmitter: EventEmitter<NgxDatePickerSelection> = new EventEmitter<NgxDatePickerSelection>();

  // Allow user to provide config via input
  @Input('config')
  config: NgxDatePickerInputConfig = getInputConfigDefaults();

  // Internal state
  inputValue: any;
  showDatePicker: boolean = false;
  darkMode: boolean = false;
  clickedInsideHost: boolean = true;

  /**
   * Constructor.
   * @param elementRef
   */
  constructor(protected elementRef: ElementRef) {}

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    this.darkMode = this.config.darkMode;
    this.inputValue = this.config.datePresentationValue;
  }

  /**
   * Called when a user clicks within the host element.
   */
  @HostListener('click')
  onHostClick() {
    this.clickedInsideHost = true;
  }

  /**
   * Called when a user clicks within the document element.
   */
  @HostListener('document:click')
  onDocumentClick() {
    if (!this.clickedInsideHost) {
      this.showDatePicker = false;
    }

    this.clickedInsideHost = false;
  }

  /**
   * Called when the value of the "date" property changes. For example, when a user selects a date or range on the
   * date picker component.
   */
  onDatePickerChanges(): void {
    this.dateEmitter.emit(this.date);
    this.inputValue = this.getDatePresentationValue();

    if (this.date?.completed == true) {
      this.showDatePicker = !this.date?.completed
    }
  }

  /**
   * Called when a user clicks on the date picker input.
   */
  onInputClick(): void {
    this.showDatePicker = true;
  }

  /**
   * Get the value that should show in the date picker input.
   */
  getDatePresentationValue(): any {
    const datePipe: DatePipe = new DatePipe(this.config.datePresentationLocale);

    if (this.date?.startDate == this.date?.endDate) {
      return datePipe.transform(this.date?.startDate, this.config.datePresentationFormat);
    }

    return datePipe.transform(this.date?.startDate, this.config.datePresentationFormat)
      + ' - ' + datePipe.transform(this.date?.endDate, this.config.datePresentationFormat);
  }

  getCalendarIcon(): string {
    if (this.config.calendarIcon) {
      return this.config.calendarIcon;
    }

    return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2' +
      'JlIElsbHVzdHJhdG9yIDI4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZ' +
      'lcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93' +
      'd3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3Jv' +
      'dW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojN0M3Q' +
      'zdDO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTE0LjUsMThjLTAuNywwLTEuMy0wLjItMS44LTAuN2MtMC41LTAuNS0wLjctMS' +
      '4xLTAuNy0xLjhjMC0wLjcsMC4yLTEuMywwLjctMS44YzAuNS0wLjUsMS4xLTAuNywxLjgtMC43CglzMS4zLDAuMiwxLjgsMC43YzAuNSwwLjU' +
      'sMC43LDEuMSwwLjcsMS44YzAsMC43LTAuMiwxLjMtMC43LDEuOEMxNS44LDE3LjgsMTUuMiwxOCwxNC41LDE4eiBNNSwyMmMtMC41LDAtMS0w' +
      'LjItMS40LTAuNgoJUzMsMjAuNSwzLDIwVjZjMC0wLjUsMC4yLTEsMC42LTEuNEM0LDQuMiw0LjUsNCw1LDRoMVYyaDJ2Mmg4VjJoMnYyaDFjM' +
      'C42LDAsMSwwLjIsMS40LDAuNkMyMC44LDUsMjEsNS40LDIxLDZ2MTQKCWMwLDAuNS0wLjIsMS0wLjYsMS40UzE5LjYsMjIsMTksMjJINXogTT' +
      'UsMjBoMTRWMTBINVYyMHogTTUsOGgxNFY2SDVWOHogTTUsOFY2Vjh6Ii8+Cjwvc3ZnPgo=';
  }
}

/**
 * Configuration for the input and also the date picker.
 */
export interface NgxDatePickerInputConfig extends NgxDatePickerConfig {
  datePresentationFormat: string;
  datePresentationLocale: string;
  datePresentationValue: any;
  calendarIcon: any
}

/**
 * Get the configuration defaults for the input and the date picker.
 *
 * @publicApi
 */
export const getInputConfigDefaults = (): NgxDatePickerInputConfig => {
  return Object.assign(getConfigDefaults(), {
    datePresentationFormat: 'MMM d, y',
    datePresentationLocale: 'en-US',
    datePresentationValue: 'Click Here to Choose Date',
    calendarIcon: undefined
  });
}
