/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { ExceptionHandler } from './general/exception-handler';
import { HttpService } from './http/http.service';
import { LoggerService } from './general/logger.service';
import { SessionService } from './general/session.service';
import { SpinnerService } from './spinner/spinner.service';

@Injectable()
export class CoreService {

  public constructor(private _exceptionHandler: ExceptionHandler,
                     private _session: SessionService,
                     private _http: HttpService,
                     private _logger: LoggerService,
                     private _spinner: SpinnerService) {
  }

  public get exceptionHandler(): ExceptionHandler {
    return this._exceptionHandler;
  }

  public get http(): HttpService {
    return this._http;
  }

  public get logger(): LoggerService {
    return this._logger;
  }

  public get session(): SessionService {
    return this._session;
  }

  public get spinner(): SpinnerService {
    return this._spinner;
  }

}
