/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DateFormat, LocalizationLibrary, DEFAULT_LANGUAGE, Language } from '../localization';
import { Assertion } from '@app/core';

import * as moment from 'moment';


export type DateString = Date | string;


export class DateStringLibrary {


  static compareDates(value1: DateString, value2: DateString): number {
    const date1 = this.datePart(value1);
    const date2 = this.datePart(value2);

    if (date1 && date2) {
      return date1.localeCompare(date2);
    } else if (date1 && !date2) {
      return -1;
    } else if (!date1 && date2) {
      return 1;
    } else if (!date1 && !date2) {
      return 0;
    } else {
      throw Assertion.assertNoReachThisCode('DateStringLibrary.compareDates() programming error.');
    }
  }


  static daysBetween(value1: DateString, value2: DateString): number {
    const date1 = moment(value1);
    const date2 = moment(value2);

    return date2.diff(date1, 'days');
  }


  static shortMonthName(value: number, lang: Language = DEFAULT_LANGUAGE) {
    return LocalizationLibrary.shortMonthName(value, lang);
  }


  static today(): DateString {
    return moment().format('YYYY-MM-DD');
  }


  static datePart(value: DateString): string {
    const date = this.toDate(value);

    if (!date) {
      return '';
    }

    return `${date.getFullYear()}-` +
           `${this.padZeros(date.getMonth() + 1)}-` +
           `${this.padZeros(date.getDate())}`;
  }


  static dateTimePart(value: DateString): string {
    const date = this.toDate(value);

    if (!date) {
      return '';
    }

    return this.datePart(value) +
           `T:${this.padZeros(date.getHours())}:` +
           `${this.padZeros(date.getMinutes())}:${this.padZeros(date.getSeconds())}` +
           `:00Z`;
  }


  static isDate(dateString: DateString): boolean {
    return (!!this.toDate(dateString));
  }


  static isLeapYear(year: number): boolean {
    if ((year % 4) !== 0) {
      return false;
    } else if (((year % 100) === 0) && ((year % 400) !== 0)) {
      return false;
    }
    return true;
  }


  static format(value: DateString, returnedFormat: DateFormat = 'DMY'): string {
    const date = this.toDate(value);

    if (!date) {
      return null;
    }

    const day = this.padZeros(date.getDate());
    const month = LocalizationLibrary.shortMonthName(date.getMonth());
    const year = date.getFullYear();

    if (returnedFormat === 'DMY') {
      return `${day}/${month}/${year}`;

    } else if (returnedFormat === 'YMD') {
      return `${year}/${month}/${day}`;

    } else if (returnedFormat === 'MDY') {
      return `${month}/${day}/${year}`;
    }
  }


  static toDate(value: DateString): Date {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return this.tryParse(value.toISOString());
    }

    if (typeof value === 'string') {
      return this.tryParse(value as string);
    }

    return null;
  }


  static yearMonth(dateString: DateString): string {
    const date = this.toDate(dateString);

    return date.getFullYear() + '-' + this.padZeros(date.getMonth() + 1);
  }


  // private methods


  private static getYearAsString(year: number): string {
    if (0 <= year && year <= 40) {
      return (year + 2000).toString();

    } else if (40 < year && year <= 100) {
      return (year + 1900).toString();

    } else if (1900 <= year && year <= 2078) {
      return year.toString();

    } else {
      return null;
    }
  }


  private static isValidDate(year: number, month: number, dayOfMonth: number): boolean {
    const monthsWith30Days = [3, 5, 8, 10];
    const monthsWith31Days = [0, 2, 4, 6, 7, 9, 11];


    if (!(1900 <= year && year <= 2078)) {
      return false;
    }

    if (!(0 <= month && month <= 11)) {
      return false;
    }

    if (monthsWith30Days.includes(month)) {
      return (1 <= dayOfMonth && dayOfMonth <= 30);
    }

    if (monthsWith31Days.includes(month)) {
      return (1 <= dayOfMonth && dayOfMonth <= 31);
    }

    if (this.isLeapYear(year)) {
      return (1 <= dayOfMonth && dayOfMonth <= 29);
    } else {
      return (1 <= dayOfMonth && dayOfMonth <= 28);
    }
  }


  private static isNumericValue(value: string): boolean {
    if (isNaN(Number(value))) {
      return false;
    }
    return true;
  }


  private static padZeros(value: number): string {
    const temp = String(value);

    return temp.padStart(2, '0');
  }


  private static tryParse(value: string): Date {
    if (!value) {
      return null;
    }

    const dateParts = value.replace(new RegExp('-', 'g'), '/').split('/');

    if (dateParts.length !== 3) {
      return null;
    }

    let monthIndex = dateParts.findIndex(x => LocalizationLibrary.findMonth(x) !== -1);
    if (monthIndex !== -1) {
      dateParts[monthIndex] = LocalizationLibrary.findMonth(dateParts[monthIndex]).toString();
    } else if (this.isNumericValue(dateParts[1]) &&
               (1 <= +dateParts[1] && +dateParts[1] <= 12)) {
      monthIndex = 1;
      dateParts[1] = (+dateParts[1] - 1).toString();
    } else if (this.isNumericValue(dateParts[0]) &&
               (1 <= +dateParts[0] && +dateParts[0] <= 12)) {
      monthIndex = 0;
      dateParts[0] = (+dateParts[0] - 1).toString();
    } else {
      return null;
    }

    let yearIndex = dateParts.findIndex(x => this.isNumericValue(x) &&
                                       (1900 <= +x && +x <= 2078) || x.length === 4);
    if (yearIndex === -1) {
      yearIndex = 2;
    }
    dateParts[yearIndex] = this.getYearAsString(+dateParts[yearIndex]);


    let dayIndex = dateParts.findIndex(x => x.includes('T'));
    if (dayIndex !== -1) {
      dateParts[dayIndex] = dateParts[dayIndex].substr(0, 2);
    } else if (yearIndex === 2 && monthIndex === 1) {
      dayIndex = 0;
    } else if (yearIndex === 2 && monthIndex === 0) {
      dayIndex = 1;
    } else if (yearIndex === 0 && monthIndex === 1) {
      dayIndex = 2;
    } else {
      return null;
    }

    if (!this.isValidDate(+dateParts[yearIndex], +dateParts[monthIndex], +dateParts[dayIndex])) {
      return null;
    }

    const parsedDate = moment(`${+dateParts[yearIndex]}-` +
                              `${this.padZeros(+dateParts[monthIndex] + 1)}-` +
                              `${this.padZeros(+dateParts[dayIndex])}`).toDate();

    if (parsedDate && !isNaN(parsedDate.getFullYear())) {
      return parsedDate;
    } else {
      return null;
    }
  }

}
