/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion } from '../general/assertion';

import { ApplicationSettingsService } from './application-settings.service';
import { ApplicationSettings } from './application-settings';
import { Principal } from '../security/principal';
import { KeyValue } from '../data-types/key-value';


@Injectable()
export class SessionService {

  private principal: Principal = Principal.empty;
  private data: KeyValue[] = [];

  constructor(private appSettingsService: ApplicationSettingsService) { }


  getSettings(): Promise<ApplicationSettings> {
    return this.appSettingsService.getApplicationSettings();
  }


  getPrincipal(): Principal {
    return this.principal;
  }


  setPrincipal(principal: Principal) {
    Assertion.assertValue(principal, 'principal');

    this.principal = principal;
  }


  getData<T>(key: string): T {
    Assertion.assertValue(key, 'key');

    const index = this.data.findIndex((x) => x.key === key);

    if (index !== -1) {
      return this.data[index].value as T;
    } else {
      throw new Error(`'${key}' value is not defined in application session data.`);
    }
  }


  setData<T>(key: string, value: T): void {
    Assertion.assertValue(key, 'key');
    Assertion.assertValue(value, 'value');

    const index = this.data.findIndex((x) => x.key === key);

    if (index !== -1) {
      this.data[index] = { key, value };
    } else {
      this.data.push({ key, value });
    }
  }

}
