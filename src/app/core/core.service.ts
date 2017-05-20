/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { ApplicationSettingsService, LoggerService,
         PrincipalService,
         SpinnerService } from './';

import { HttpApiClient } from 'empiria';

@Injectable()
export class CoreService {

  public constructor(private _appSettings: ApplicationSettingsService,
                     private _logger: LoggerService,
                     private _principal: PrincipalService,
                     private _spinner: SpinnerService) {
  }

  public get appSettings(): ApplicationSettingsService {
    return this._appSettings;
  }

  public get logger(): LoggerService {
    return this._logger;
  }

  public get principal(): PrincipalService {
    return this._principal;
  }

  public get spinner(): SpinnerService {
    return this._spinner;
  }

  public getHttpClient(baseAddress: string): HttpApiClient {
    return new HttpApiClient(baseAddress);
  }

}
