/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Cryptography, HttpApiClient } from 'empiria';

import { ApplicationSettingsService } from '../../core';

export interface SessionDef {
  readonly access_token: string;
  readonly user: object;
  readonly expires_in: number;
  readonly refresh_token: string;
  readonly token_type: string;
}

@Injectable()
export class UserLoginService {

  constructor(private appSettings: ApplicationSettingsService) { }

  public async authenticate(userID: string, password: string): Promise<SessionDef> {
    let url = this.appSettings.get<string>('HTTP_API_BASE_ADDRESS');
    let httpApiClient = new HttpApiClient(url);

    httpApiClient.IncludeAuthorizationHeader = false;

    let hashPassword = Cryptography.convertToMd5(password);

    return await httpApiClient.postAsyncAsPromise<SessionDef>({
      api_key: this.appSettings.get<string>('APPLICATION_KEY'),
      user_name: userID,
      password: hashPassword
    }, 'v1/security/login');
  }

}
