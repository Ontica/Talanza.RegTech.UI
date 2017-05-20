/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Cryptography, HttpApiClient } from 'empiria';

import { ApplicationSettingsService } from '../general/application-settings.service';
import { Session } from './session';

@Injectable()
export class SecurityDataService {

  constructor(private settings: ApplicationSettingsService) { }

  public async createSession(userID: string, userPassword: string): Promise<Session> {
    await this.settings.onLoad();

    const API_KEY = this.settings.get<string>('APPLICATION_KEY');
    const BASE_ADDRESS = this.settings.get<string>('HTTP_API_BASE_ADDRESS');

    const body = {
      api_key: API_KEY,
      user_name: userID,
      password: Cryptography.convertToMd5(userPassword)
    };

    let http = new HttpApiClient(BASE_ADDRESS);
    http.IncludeAuthorizationHeader = false;

    return await http.postAsyncAsPromise<Session>(body, 'v1/security/login');
  }

  public async closeSession(): Promise<void> {
    const BASE_ADDRESS = this.settings.get<string>('HTTP_API_BASE_ADDRESS');

    let http = new HttpApiClient(BASE_ADDRESS);

    await http.postAsyncAsPromise(undefined, BASE_ADDRESS + 'v1/security/logout');
  }

}
