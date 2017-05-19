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

  public async onLoad(): Promise<Boolean> {
    await this.loadSettingsFromFile();

    return true;
  }

  public get<T>(key: string): T {
    Assertion.assertValue(this.settings,
              'Application settings were not loaded yet. ' +
              'Please call ConfigurationService.onLoad() promise to ensure data were ' +
              'loaded before using this method.');

    const index = this.settings.findIndex((x) => x.key === key);

    if (index !== -1) {
      return <T> this.settings[index].value;
    } else {
      throw new Error(`'${key}' value is not defined in application settings file.`);
    }
  }

  private loadSettingsFromFile() {
    return this.http.get(this.configurationFileName)
                    .toPromise()
                    .then((response) => this.settings = response.json()['settings'] as KeyValue[])
                    .catch((e) => Promise.reject(
                                new Error(`Critical error: Can't read ${this.configurationFileName} ` +
                                          `application settings file. ${e.status} ${e.statusText}`)));
  }

}
