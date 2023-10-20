import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { getDayOfTheMonthNames, getMaxDayCount, getMonths, getYearOffset, getYears } from './helpers/date';

@Component({
  selector: 'ngx-date-picker',
  templateUrl: './ngx-date-picker-ui.component.html',
  styleUrls: ['./ngx-date-picker-ui.component.scss']
})
export class NgxDatePickerUiComponent implements OnInit {
  // Make some helper functions accessible
  protected readonly getYears = getYears;
  protected readonly ViewMode = ViewMode;
  protected readonly getDayOfTheMonthNames = getDayOfTheMonthNames;
  protected readonly getMonths = getMonths;

  @Input('date')
  date: NgxDatePickerSelection | undefined;

  // Allow user to subscribe to date changes using output
  @Output('dateChange')
  dateEmitter: EventEmitter<NgxDatePickerSelection> = new EventEmitter<NgxDatePickerSelection>();

  // Allow user to provide config via input
  @Input('config')
  config: NgxDatePickerConfig = getConfigDefaults();

  // Binding to host element for enabling of dark mode
  @HostBinding('class.dark-mode')
  darkMode: boolean = false;

  // Represents the current visible date
  readonly displayDate: Date = new Date();

  // Represents the current date selection
  dateSelection: NgxDatePickerSelection = {
    startDate: new Date(),
    endDate: new Date(),
    completed: false
  };

  // The current view mode for the date picker
  viewMode: ViewMode = ViewMode.DAY;

  // The current day selection state
  currentDaySelectionState: DaySelectionState = DaySelectionState.SELECT_START;

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    if (this.date) {
      this.dateSelection = this.date;
    }

    this.viewMode = this.config.initialView;
    this.darkMode = this.config.darkMode;
  }

  /**
   *  Called to notify any observers of the "date" input/output.
   */
  private notifyDateChanges(): void {
    this.dateEmitter.emit(this.dateSelection);
  }

  /**
   * Generates a CalendarDayItem.
   * @param currentDate
   */
  private generateCalendarDayItem(currentDate: Date): CalendarDayItem {
    let isStartDate = false;
    let isEndDate = false;
    let isBetweenDate = false;

    // Check if the currentDate is the currently selected start date
    if (this.dateSelection.startDate && this.dateSelection.startDate.toDateString() == currentDate.toDateString()) {
      isStartDate = true;
    }

    // Check if the currentDate is the currently selected end date
    if (this.dateSelection.endDate && this.dateSelection.endDate.toDateString() == currentDate.toDateString()) {
      isEndDate = true;
    }

    // Check if the currentDate is within the currently selected state and end dates
    if (this.dateSelection.startDate && this.dateSelection.endDate
        && currentDate >= this.dateSelection.startDate && currentDate <= this.dateSelection.endDate) {
      isBetweenDate = true;
    }

    return {
      key: currentDate,
      value: currentDate.getDate(),
      isStartDate: isStartDate,
      isBetweenDates: isBetweenDate,
      isEndDate: isEndDate,
      enabled: this.isDateInAllowedRange(currentDate)
    }
  }

  /**
   * Check if the provided date is within the allowed range of dates.
   * @param date
   */
  private isDateInAllowedRange(date: Date): boolean {
    return date >= this.config.minDate && date <= this.config.maxDate;
  }

  /**
   * Generate an array of days of the month that will be rendered via the UI. This function will generate all the
   * current days in the month as well as a number of the previous month days to complete the week.
   */
  generateDaysOfTheMonth(): CalendarDayItem[] {
    const values: CalendarDayItem[] = [];

    const previousMonth = new Date(this.displayDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    previousMonth.setDate(getMaxDayCount(previousMonth));

    const previousMonthBufferDays = previousMonth.getDay();
    for (let i = 0; i < previousMonthBufferDays; i++) {
      values.push(this.generateCalendarDayItem(previousMonth));
      previousMonth.setDate(previousMonth.getDate() - 1);
    }

    // Reverse the array since the previous months final days are in reverse order
    values.reverse();

    for (let i = 1; i < getMaxDayCount(this.displayDate) + 1; i++) {
      const currentDate = new Date(this.displayDate.getTime());
      currentDate.setDate(i);
      values.push(this.generateCalendarDayItem(currentDate));
    }

    return values;
  }

  /**
   * Create a new display date instance.
   */
  getDisplayDate(): Date {
    return new Date(this.displayDate);
  }

  /**
   * Get the picker class values.
   */
  getPickerClassValues(): {} {
    return {
      'day': this.viewMode == ViewMode.DAY,
      'month': this.viewMode == ViewMode.MONTH,
      'year': this.viewMode == ViewMode.YEAR,
      'range-mode': this.config.rangeMode
    }
  }

  /**
   * Get the class values for the provided day item based on the internal state of the picker.
   * @param dayItem
   */
  getDayOfMonthClassValues(dayItem: CalendarDayItem): {} {
    return {
      'startDate': dayItem.isStartDate,
      'betweenDate': dayItem.isBetweenDates,
      'endDate': dayItem.isEndDate,
      'previousMonth': dayItem.key.getMonth() !== this.displayDate.getMonth(),
      'disabled': !dayItem.enabled
    }
  }

  /**
   * Called when a user selects a day on the picker.
   * @param day
   */
  onSelectDay(day: CalendarDayItem) {
    this.dateSelection.completed = false;

    if (!this.config.rangeMode) {
      this.dateSelection.endDate = this.dateSelection.startDate = day.key;
      this.dateSelection.completed = true;
      this.notifyDateChanges();
      return ;
    }

    if (this.currentDaySelectionState == DaySelectionState.SELECT_START) {
      this.dateSelection.startDate = this.dateSelection.endDate = day.key;
      this.currentDaySelectionState = DaySelectionState.SELECT_END;
    } else if (this.currentDaySelectionState == DaySelectionState.SELECT_END) {
      if (this.dateSelection.startDate && day.key < this.dateSelection.startDate) {
        this.dateSelection.endDate = new Date(this.dateSelection.startDate);
        this.dateSelection.startDate = day.key;
      } else {
        this.dateSelection.endDate = new Date(day.key);
      }

      this.currentDaySelectionState = DaySelectionState.SELECT_START;
      this.dateSelection.completed = true;
    }

    this.notifyDateChanges();
  }

  /**
   * Called when a user selects to go to the next month.
   */
  onNextMonth() {
    this.displayDate.setMonth(this.displayDate.getMonth() + 1);
    this.displayDate.setDate(1);
  }

  /**
   * Called when a user selects to go to the previous month.
   */
  onPreviousMonth() {
    this.displayDate.setMonth(this.displayDate.getMonth() - 1);
    this.displayDate.setDate(1);
  }

  /**
   * Called when a user selects to change the month and year.
   */
  onChangeMonthYear() {
    this.viewMode = ViewMode.YEAR;
  }

  /**
   * Called when the user selects a year on the picker.
   * @param year
   */
  onYearSelect(year: number) {
    this.displayDate.setFullYear(year);
    this.viewMode = ViewMode.MONTH;
  }

  /**
   * Called when the user selects a month on the picker.
   * @param month
   */
  onMonthSelect(month: any) {
    this.displayDate.setMonth(getMonths().indexOf(month));
    this.viewMode = ViewMode.DAY;
  }
}

/**
 * Enum that represents the current date selection state.
 */
enum DaySelectionState {
  SELECT_START,
  SELECT_END
}

/**
 * Enum that represents the view of the picker.
 */
enum ViewMode {
  YEAR,
  MONTH,
  DAY
}

/**
 * Interface that represents the values used by the calendar to represent the state of a day item.
 */
interface CalendarDayItem {
  key: any;
  value: any;
  isStartDate: boolean;
  isBetweenDates: boolean;
  isEndDate: boolean;
  enabled: boolean;
}

/**
 * Interface that represents the dictionary values that are used to contain the start and end date selection. If
 * running in non-range mode, both values will be identical.
 *
 * @publicApi
 */
export interface NgxDatePickerSelection {
  startDate: Date;
  endDate: Date;
  completed: boolean;
}

/**
 * Configuration values for the date picker.
 *
 * @publicApi
 */
export interface NgxDatePickerConfig {
  minDate: Date;
  maxDate: Date;
  initialView: ViewMode;
  rangeMode: boolean;
  darkMode: boolean;
}

/**
 * Get the configuration defaults.
 *
 * @publicApi
 */
export const getConfigDefaults = (): NgxDatePickerConfig => {
  return {
    minDate: getYearOffset(-20),
    maxDate: getYearOffset(20),
    initialView: ViewMode.DAY,
    rangeMode: true,
    darkMode: false
  };
}
