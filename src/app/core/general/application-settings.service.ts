/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Assertion } from 'empiria';

import 'rxjs/add/operator/toPromise';

interface KeyValue {
  readonly key: string;
  readonly value: any;
}

@Injectable()
export class ApplicationSettingsService {

  private readonly configurationFileName = './assets/empiria.config.json';

  private settings: KeyValue[];

  constructor(private http: Http) { }

  public get<T>(key: string): T {
    Assertion.assertValue(this.settings,
      'Application settings were not loaded yet. ' +
      'Please call ConfigurationService.waitUntilLoaded() promise to ensure data were ' +
      'loaded before using this method.');

    const index = this.settings.findIndex((x) => x.key === key);

    if (index !== -1) {
      return this.settings[index].value as T;
    } else {
      throw new Error(`'${key}' value is not defined in application settings file.`);
    }
  }

  public async waitUntilLoaded(): Promise<void> {
    if (!this.settings) {
      this.settings = await this.loadSettingsFromFile();
    }
  }

  private loadSettingsFromFile(): Promise<KeyValue[]> {
    return this.http.get(this.configurationFileName)
                    .toPromise()
                    .then((response) => response.json()['settings'] as KeyValue[])
                    .catch((e) => this.handleLoadSettingsFromFileError(e));
  }

  private handleLoadSettingsFromFileError(error): Promise<never> {
    return Promise.reject(new Error(`Critical error: Can't read ${this.configurationFileName} ` +
                                    `application settings file. ${error.status} ${error.statusText}`));
  }

}
