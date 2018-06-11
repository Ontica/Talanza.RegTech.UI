/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Assertion } from '../general/assertion';

import { ApplicationSettingsService } from './application-settings.service';
import { ApplicationSettings } from './application-settings';
import { Principal } from '../security/principal';
import { KeyValue } from '../data-types';

@Injectable()
export class SessionService {

  private appSettings: ApplicationSettings = undefined;
  private principal: Principal = Principal.empty;
  private data: KeyValue[] = [];

  constructor(private appSettingsService: ApplicationSettingsService) { }

  public getSettings(): ApplicationSettings {
    Assertion.assertValue(this.appSettings,
                          'Application settings were not loaded yet. ' +
                          'Please call SessionService.start() promise to ensure data were ' +
                          'loaded before using this method.');

    return this.appSettings;
  }

  public getPrincipal(): Principal {
    return this.principal;
  }

  public setPrincipal(principal: Principal) {
    Assertion.assertValue(principal, 'principal');

    this.principal = principal;
  }

  public getData<T>(key: string): T {
    Assertion.assertValue(key, 'key');

    const index = this.data.findIndex((x) => x.key === key);

    if (index !== -1) {
      return this.data[index].value as T;
    } else {
      throw new Error(`'${key}' value is not defined in application session data.`);
    }
  }

  public setData<T>(key: string, value: T): void {
    Assertion.assertValue(key, 'key');
    Assertion.assertValue(value, 'value');

    const index = this.data.findIndex((x) => x.key === key);

    if (index !== -1) {
      this.data[index] = { key, value };
    } else {
      this.data.push( { key, value });
    }
  }

  public async start(): Promise<void> {
    if (!this.appSettings) {
      await this.appSettingsService.getSettingsArray()
                                   .then((x) => this.appSettings = new ApplicationSettings(x));
    }
  }

}
