/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DateFormat, Language, LocalizationLibrary, DEFAULT_LANGUAGE } from '../localization';


export type DateString = Date | string;


export class DateStringLibrary {

  public static compareDateParts(value1: DateString, value2: DateString): number {
    const date1 = this.datePart(value1);
    const date2 = this.datePart(value2);

    if (date1 < date2) {
      return -1;

    } else if (date1 === date2) {
      return 0;

    } else if (date1 > date2) {
      return 1;

    } else {
      throw new Error(`Can't compare dates with values '${value1}' and '${value2}'`);

    }
  }


  public static datePart(value: DateString): string {
    const date = this.toDate(value);

    if (!date) {
      return '';
    }

    return `${date.getFullYear()}-${this.padZeros(date.getMonth() + 1, 2)}-${this.padZeros(date.getDate(), 2)}`;
  }


  public static dateTimePart(value: DateString): string {
    const date = this.toDate(value);

    if (!date) {
      return '';
    }

    return `${date.getFullYear()}-${this.padZeros(date.getMonth() + 1, 2)}-${this.padZeros(date.getDate(), 2)}
           T:${this.padZeros(date.getHours(), 2)}:${this.padZeros(date.getMinutes(), 2)}:00`;
  }


  public static formatDMY(value: DateString): string {
    const date = DateStringLibrary.tryParseDateValue(value);

    const dmyFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return this.tryFormat(dmyFormatted);
  }


  public static isDate(dateString: string,
    format: DateFormat = 'DMY'): boolean {

    const formatted = this.tryFormat(dateString);

    if (!formatted) {
      return false;
    }

    let dateParts = formatted.split("/");

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

        if (+dateParts[0] == 29) { // check leap years
          if ((+dateParts[2] % 4) != 0) {
            return false;
          } else if (((+dateParts[2] % 100) == 0) && ((+dateParts[2] % 400) != 0)) {
            return false;
          }
        }

        return true;

      case "abr": case "apr":
      case "jun": case "sep": case "nov":

        if (+dateParts[0] == 31) {
          return false;
        }

        return true;

      case "ene": case "jan":
      case "mar": case "may": case "jul":
      case "ago": case "aug":
      case "oct":
      case "dic": case "dec":

        return true;

      default:
        return false;
    }
  }


  public static toDate(value: DateString): Date {
    if (value instanceof Date) {
      return value;
    }

    return DateStringLibrary.tryParseDateValue(value);
  }


  public static tryFormat(value: string,
    fromFormat: DateFormat = 'DMY'): string {

    if (!value || value.length === 0) {
      return null;
    }

    let temp = String(value).toLowerCase();
    let regex = /-/g;
    temp = temp.replace(regex, "/");
    regex = /[.]/g;
    temp = temp.replace(regex, "/");

    let dateParts = temp.split("/");

    if (dateParts.length != 3) {
      return null;
    }

    if (!this.isNumericValue(dateParts[0]) || !this.isNumericValue(dateParts[2])) {
      return null;
    }

    if (!(1 <= +dateParts[0] && +dateParts[0] <= 31)) {
      return null;
    }

    dateParts[0] = this.padZeros(+dateParts[0], 2);

    if (0 <= +dateParts[2] && +dateParts[2] <= 40) {
      dateParts[2] = (+dateParts[2] + 2000).toString();

    } else if (40 < +dateParts[2] && +dateParts[2] <= 100) {
      dateParts[2] = (+dateParts[2] + 1900).toString();
    }
    if (+dateParts[2] > 2078) {
      return null;
    }
    if (this.isNumericValue(dateParts[1])) {

      if (!(1 <= +dateParts[1] && +dateParts[1] <= 12)) {
        return null;
      }

      dateParts[1] = LocalizationLibrary.shortMonthName(+dateParts[1] - 1);

    } else {

      dateParts[1] = this.formatMonthName(dateParts[1]);

    }

    return dateParts[0] + "/" + dateParts[1] + "/" + dateParts[2];
  }


  public static tryParseDateValue(value: DateString): Date {
    if (!value) {
      return undefined;
    }
    if (typeof value === 'string') {
      return new Date(value);
    }
    if (value instanceof Date) {
      return value;
    }

    return undefined;
  }


  public static tryParseDate(value: string,
                             lang: Language = DEFAULT_LANGUAGE): Date {

    let dateParts = (value as string).split("/");

    let month = LocalizationLibrary.getMonth(dateParts[1], lang);

    return new Date(+dateParts[2], month, +dateParts[0], 0, 0, 0, 0);

  }

  // private methods

  private static formatMonthName(name: string): string {

    const month = LocalizationLibrary.findMonth(name)

    if (month != -1) {
      return LocalizationLibrary.shortMonthName(month);
    }

    throw new Error(`Invalid month '${name}'.`);
  }


  private static isNumericValue(value: string): boolean {
    if (isNaN(Number(value))) {
      return false;
    }
    return true;
  }


  private static padZeros(value: number, size: number): string {
    var temp = String(value);

    while (temp.length < size) {
      temp = "0" + temp;
    }
    return temp;
  }

}
