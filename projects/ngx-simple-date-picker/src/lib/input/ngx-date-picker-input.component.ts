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
}

/**
 * Configuration for the input and also the date picker.
 */
export interface NgxDatePickerInputConfig extends NgxDatePickerConfig {
  datePresentationFormat: string;
  datePresentationLocale: string;
  datePresentationValue: any;
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
    datePresentationValue: 'Click Here to Choose Date'
  });
}
