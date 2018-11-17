/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { AfterViewInit, Component, EventEmitter,
         Input, OnChanges, Output, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateString, DateStringLibrary } from '@app/models/core';

import { CalendarSettings, DEFAULT_SETTINGS } from './calendar.settings';
import { DatePickerWrapper } from './dhtmlX-calendar-wrapper';


let _uniqueIdCounter = 0;


@Component({
  selector: 'emp-ng-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatePickerComponent), multi: true },
  ]
})
export class DatePickerComponent implements AfterViewInit, ControlValueAccessor, OnChanges {

  @Output() change = new EventEmitter<DateString>();


  @Input()
  get config(): CalendarSettings { return this._config; }
  set config(value: CalendarSettings) {
    this._config = value;
  }
  private _config = DEFAULT_SETTINGS;


  @Input()
  get date(): DateString { return this._date; }
  set date(value: DateString) {
    this._date = DateStringLibrary.toDate(value);

    this.refreshCalendarDate();
  }
  private _date: DateString;


  displayedDateString = '';

  disabled = false;

  private calendar: DatePickerWrapper;

  inputId = `date-picker-input-${_uniqueIdCounter++}`;
  buttonId = `date-picker-button-${_uniqueIdCounter}`;

  propagateChange = (_: any) => { };
  // propagateTouch = (_: any) => {};

  constructor() {

  }

  ngOnChanges() {
    this.refreshCalendarDate();
  }


  ngAfterViewInit() {
    this.createCalendar();
    this.attachEvents();
    this.hideOrShowCalendar();
  }


  onblur() {
    if (this.displayedDateString.length === 0) {

      this.calendar.setDate(new Date());

      this.propagateDateChange(null);

    } else if (DateStringLibrary.isDate(this.displayedDateString)) {

     this.displayedDateString = DateStringLibrary.format(this.displayedDateString);

     const parsedDate = DateStringLibrary.toDate(this.displayedDateString);

     this.calendar.setDate(parsedDate);

     this.propagateDateChange(this.calendar.getDate());

    } else {
      this.displayedDateString = '';

      this.calendar.setDate(new Date());

      console.log('Invalid date', this.displayedDateString);
    }
  }


  // implement ControlValueAccessor


  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }


  registerOnTouched(fn: any): void {
    // this.propagateTouch = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    if (this.disabled === isDisabled) {
      return;
    }

    this.disabled = isDisabled;

    this.hideOrShowCalendar();
  }

  writeValue(obj: any): void {
    if (obj) {
      this._date = (typeof obj === 'string') ? new Date(obj) : obj;
    } else {
      this._date = undefined;
    }
    this.refreshCalendarDate();
  }


  // private methods

  private attachEvents() {
    this.calendar.attachEvent('onClick',
      date => {
        this.displayedDateString = DateStringLibrary.format(date);
        this.propagateDateChange(date);
      });
  }


  private createCalendar() {
    this.calendar = new DatePickerWrapper(this.config, this.buttonId);
  }


  private hideOrShowCalendar() {
    if (!this.calendar) {
      return;
    }
    this.calendar.protectDisplay(this.disabled, this.buttonId);
  }


  private propagateDateChange(value: Date) {
    let valueToEmit: DateString;

    if (!value) {
      valueToEmit = null;

    } else if (this.config.returnType === 'string' && this.config.hideTime) {
      valueToEmit = DateStringLibrary.datePart(value);

    } else if (this.config.returnType === 'string' && !this.config.hideTime) {
      valueToEmit = DateStringLibrary.dateTimePart(value);

    } else if (this.config.returnType === 'date') {
      valueToEmit = value;

    }

    this.change.emit(valueToEmit);
    this.propagateChange(valueToEmit);
  }


  private refreshCalendarDate() {
    if (this.date) {
      this.displayedDateString = DateStringLibrary.format(this.date);
    } else {
      this.displayedDateString = '';
    }

    if (this.calendar && this.date) {
      this.calendar.setDate(this.date);
    } else if (this.calendar) {
      this.calendar.setDate(new Date());
    }
  }

}
