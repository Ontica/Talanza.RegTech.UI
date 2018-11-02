/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Language, DEFAULT_LANGUAGE } from '@app/models/localization';


export interface CalendarSettings {
  language: Language;
  hideWeekendDays?: boolean;
  showHolidays?: boolean;
  hideTime?: boolean;
  showWeekNumber?: boolean;
  showVacation?: boolean;
  returnType: 'string' | 'date';
}


export const DEFAULT_SETTINGS : CalendarSettings = {
  language: DEFAULT_LANGUAGE,
  hideWeekendDays : false,
  showHolidays : true,
  hideTime: true,
  showWeekNumber: false,
  showVacation: false,
  returnType: 'string'
}
