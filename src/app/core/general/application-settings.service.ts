/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { APP_SETTINGS } from '@assets/empiria.config';

import { ApplicationSettings } from './application-settings';


@Injectable()
export class ApplicationSettingsService {

  private settings: ApplicationSettings;

  constructor() {
    const data = JSON.parse(JSON.stringify(APP_SETTINGS.settings));

    this.settings = new ApplicationSettings(data);
  }

  getApplicationSettings(): ApplicationSettings {
    return this.settings;
  }

}
