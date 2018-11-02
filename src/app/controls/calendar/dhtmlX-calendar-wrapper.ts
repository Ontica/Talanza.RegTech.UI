/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Language, DEFAULT_LANGUAGE, LocalizationLibrary } from '@app/models/localization';

import { CalendarSettings } from './calendar.settings';

declare var dhtmlXCalendarObject: any;

export class CalendarWrapper {

  private _calendar: any;

  constructor(settings: CalendarSettings, buttonId: any) {
    const language = (settings && settings.language) ? settings.language : DEFAULT_LANGUAGE;

    this.addLanguage(language);

    this._calendar = new dhtmlXCalendarObject({ button: buttonId });

    this._calendar.loadUserLanguage(language);

    this.setSettings(settings);
  }


  public get instance(): any {
    return this._calendar;
  }


  attachEvent(eventName: string, fn: any): any {
    this._calendar.attachEvent(eventName, fn);
  }


  getDate(): Date {
    return this._calendar.getDate();
  }


  protectDisplay(disabled: boolean, buttonId: any): any {
    if (disabled) {
      this._calendar.detachObj({ button: buttonId });
      this._calendar.hide();

    } else {
      this._calendar.attachObj({ button: buttonId });
      this._calendar.show();

    }
  }


  setDate(date: Date | string): void {
    this._calendar.setDate(date);
  }


  // private methods


  private addLanguage(language: Language) {
    // add once, make sure dhtmlxcalendar.js is loaded

    dhtmlXCalendarObject.prototype.lang = language;

    dhtmlXCalendarObject.prototype.langData[language] = this.getLanguageConfig(language);
  }


  private disableRangeDays(from: string, to: string) {
    this._calendar.setInsensitiveRange(from, to);
  }


  private getLanguageConfig(lang: Language): any {
    return {
      // date format
      dateformat: "%m-%d-%Y",
      // full names of months
      monthesFNames: LocalizationLibrary.monthNames(lang),
      // short names of months
      monthesSNames: LocalizationLibrary.shortMonthNames(lang),
      // full names of days
      daysFNames: LocalizationLibrary.daysNames(lang),
      // short names of days
      daysSNames: LocalizationLibrary.shortDaysNames(lang),
      // starting day of a week. Number from 1(Monday) to 7(Sunday)
      weekstart: 7,
      // the title of the week number column
      weekname: "s"
    };
  }


  private setDefaultHolidays() {
    this.setHoliday('25-12-2017');
    this.setHoliday('01-01-2018');
    this.setHoliday('25-12-2018');
    this.setHoliday('01-01-2019');
    this.setHoliday('25-12-2019');
  }


  private setHoliday(holiday: string) {
    this._calendar.setHolidays(holiday);
  }


  private setSettings(config: CalendarSettings) {
    if (config.hideWeekendDays) {
      this._calendar.disableDays("week", [6, 7]);
    }

    if (config.showHolidays) {
      this.setDefaultHolidays();
    }

    if (config.hideTime) {
      this._calendar.hideTime();
    }

    if (config.showWeekNumber) {
      this._calendar.showWeekNumbers();
    }

    if (config.showVacation) {
      this.disableRangeDays('15-12-2017', '02-01-2018');
    }

    this._calendar.setDateFormat("%d-%M-%y");
  }

}
