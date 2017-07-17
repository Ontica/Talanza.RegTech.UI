/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Assertion } from 'empiria';

import { ApplicationSettingsService } from './application-settings.service';
import { Principal } from '../security/principal';

interface KeyValue {
  readonly key: string;
  readonly value: any;
}

@Injectable()
export class SessionService {

  private principal: Principal = Principal.empty;
  private data: KeyValue[] = [];

  constructor(private appSettings: ApplicationSettingsService) { }

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

  public async waitUntilDataLoaded(): Promise<void> {
    await this.appSettings.waitUntilLoaded();   // Todo: seek for a better solution
  }

}
