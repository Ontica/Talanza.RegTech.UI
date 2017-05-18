/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { LoggerService, SpinnerService } from './';

@Injectable()
export class CoreService {

  public constructor(private _logger: LoggerService, private _spinner: SpinnerService) {

  }

  public get logger() {
    return this._logger;
  }

  public get spinner() {
    return this._spinner;
  }

}
