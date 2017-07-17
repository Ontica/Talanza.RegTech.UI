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
import { KeyValue } from '../core-data-types';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApplicationSettingsService {

  private readonly configurationFileName = './assets/empiria.config.json';

  private settings: KeyValue[];

  constructor(private http: Http) { }

  public getSettingsArray(): Promise<KeyValue[]> {
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
