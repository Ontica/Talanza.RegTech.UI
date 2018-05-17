/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output,
        AfterViewInit, ChangeDetectionStrategy, OnInit, OnChanges} from '@angular/core';
import { DataResolver } from '../../app.resolver';


declare var dhtmlXCalendarObject: any;


export interface CalendarSettings {
  hideWeekendDays?: boolean;
  showHolidays?: boolean;
  hideTime?: boolean;
  showWeekNumber?: boolean;
  showVacation?: boolean;
}


const defaults : CalendarSettings = {
  hideWeekendDays : false,
  showHolidays : true,
  hideTime: true,
  showWeekNumber: false,
  showVacation: false
}


@Component ({
  selector: 'calendar-control',
  templateUrl:'./calendar-control.html',
  styleUrls: ['./calendar-control.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarControl implements AfterViewInit, OnInit, OnChanges {

  @Output() onSelectedDate = new EventEmitter<Date>();

  @Input()
  get date(): Date { return this._date };
  set date(value: Date) {
    if (value) {
      this._date = (typeof value === 'string') ? new Date(value) : value;
    } else {
      this._date = undefined;
    }
    this.refreshCalendarDate();
  };
  private _date: Date;


  @Input()
  get config(): CalendarSettings { return this._config };
  set config(value: CalendarSettings) {
    this._config = value
  };
  private _config = defaults;

  formattedDate = '';

  inputId = 'calendarInput';
  buttonId = 'calendarButton';

  private calendar: any;

  constructor() { }

  private initialize() {
    this.setControlId();
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnChanges() {
    console.log("ngOnChanges called");
  }


  ngAfterViewInit() {
    console.log("ngAfterViewInit called");

    this.createCalendar();
    this.setSettings();
    this.attachEvents();
  }

  onblur() {

    if (this.formattedDate.length === 0) {
      this.onSelectedDate.emit(null);

    } else if (this.isDate(this.formattedDate)) {
      const newDate = this.tryFormat(this.formattedDate);

      this.calendar.setDate(this.toDate(newDate));

      this.onSelectedDate.emit(this.calendar.getDate());

    } else {
      console.log('Not a date', this.formattedDate);
    }
  }

  private refreshCalendarDate() {
    if (this.date) {
      this.formattedDate = this.format(this.date);
    } else {
      this.formattedDate = '';
    }

    if (this.calendar && this.date) {
      this.calendar.setDate(this.date);
    } else if (this.calendar) {
      this.calendar.setDate(new Date());
    }
  }

  private attachEvents() {
    this.calendar.attachEvent("onClick",
                              date => {
                                console.log("onClick triggered", date);
                                this.formattedDate = this.format(date);
                                this.onSelectedDate.emit(date)
                              });
  }


  private createCalendar() {
    this.addLanguage("sp");

    this.calendar = new dhtmlXCalendarObject( { button: this.buttonId} );   // input: this.inputId

    this.calendar.loadUserLanguage("sp");
  }


  private setSettings(): void {
    if (this.config.hideWeekendDays) {
      this.calendar.disableDays("week", [6, 7]);
    }

    if (this.config.showHolidays) {
      this.setHolidays();
    }

    if (this.config.hideTime) {
      this.calendar.hideTime();
    }

    if (this.config.showWeekNumber) {
      this.calendar.showWeekNumbers();
    }

    if (this.config.showVacation) {
      this.disableRangeDays('15-12-2017', '02-01-2018');
    }

    this.calendar.setDateFormat("%d-%M-%y");
  }


  private setHoliday(holyday: string) {
    this.calendar.setHolidays(holyday);
  }


  private disableRangeDays(from:string, to:string) {
    this.calendar.setInsensitiveRange(from, to);
  }


  private setHolidays() {
    this.setHoliday('25-12-2017');
    this.setHoliday('01-01-2018');
    this.setHoliday('05-02-2018');
    this.setHoliday('19-03-2018');
    this.setHoliday('01-05-2018');
    this.setHoliday('20-11-2018');
    this.setHoliday('25-12-2018');
  }


  private addLanguage(language: string) {
    // add once, make sure dhtmlxcalendar.js is loaded

    dhtmlXCalendarObject.prototype.lang = language;

    dhtmlXCalendarObject.prototype.langData[language] = {
      // date format
      dateformat: "%d-%m-%Y",
      // full names of months
      monthesFNames: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ],
      // short names of months
      monthesSNames: [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
      ],
      // full names of days
      daysFNames: [
        "Lunes", "Martes", "Miércoles", "Jueves",
        "Viernes", "Sábado", "Domingo"
      ],
      // short names of days
      daysSNames: [
        "Do", "Lu", "Ma", "Mi",
        "Ju", "Vi", "Sa"
      ],
      // starting day of a week. Number from 1(Monday) to 7(Sunday)
      weekstart: 7,
      // the title of the week number column
      weekname: "s"
    };

  }


  private isNumericValue(value: string): boolean {
    if (isNaN(Number(value))) {
      return false;
    }
    return true;
  }


  private format(date: Date): string {
    const dmyFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const value = this.tryFormat(dmyFormatted);

    console.log("value in format", value);

    return value;
  }


  private tryFormat(dateString: string): string {
    if (!dateString || dateString.length === 0) {
      return null;
    }

    var temp = String(dateString).toLowerCase();
    var regex = /-/g;
    temp = temp.replace(regex, "/");
    regex = /[.]/g;
    temp = temp.replace(regex, "/");

    var dateParts = temp.split("/");

    if (dateParts.length != 3) {
      return null;
    }

    if (!this.isNumericValue(dateParts[0]) || !this.isNumericValue(dateParts[2])) {
      return null;
    }

    if (!(1 <= +dateParts[0] && +dateParts[0] <= 31)) {
      return null;
    }

    if (+dateParts[0] < 10) {
      dateParts[0] = "0" + +dateParts[0];
    }
    if (+dateParts[2] < 100) {
      dateParts[2] = (+dateParts[2] + 2000).toString();
    }
    if (+dateParts[2] > 2099) {
      return null;
    }
    if (this.isNumericValue(dateParts[1])) {

      if (!(1 <= +dateParts[1] && +dateParts[1] <= 12)) {
        return null;
      }

      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

      dateParts[1] = months[+dateParts[1] - 1];

    } else {
      // no-op
    }

    return dateParts[0] + "/" + dateParts[1] + "/" + dateParts[2];
  }


  private isDate(dateString: string): boolean {
    const formatted = this.tryFormat(dateString);

    if (!formatted) {
      return false;
    }

    var dateParts = formatted.split("/");

    if (dateParts.length != 3) {
      return false;
    }

    if (!(1 <= Number(dateParts[0]) && Number(dateParts[0]) <= 31)) {
      return false;
    }

    switch (dateParts[1].toLowerCase()) {
      case "feb":
        if (+dateParts[0] > 29) {
          return false;
        }
        if (+dateParts[0] == 29) { // check leap year
          if ((+dateParts[2] % 4) != 0) {
            return false;
          } else if (( (+dateParts[2] % 100) == 0) && ((+dateParts[2] % 400) != 0)) {
            return false;
          }
        }
        break;

      case "abr": case "jun": case "sep": case "nov":
        if (+dateParts[0] == 31) {
          return false;
        }
        break;

      case "ene": case "mar": case "may": case "jul": case "ago": case "oct": case "dic":
        break;

      default:
        return false;
    }
    return true;
  }


  private setControlId(): void {
    let idNumber = this.getRandomNumber(1,1000000);
    this.inputId = 'ci' + idNumber;
    this.buttonId = 'bi' + idNumber;
  }


  private getRandomNumber(from: number, to: number): number {
    return Math.floor((Math.random() * to) + from);
  }


  private toDate(dateString: string): Date {
    let dateParts = dateString.split("/");

    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

    const month = months.findIndex( x => x === dateParts[1].toLowerCase() );

    return new Date(+dateParts[2], month, +dateParts[0], 0, 0, 0, 0);

  }

}
