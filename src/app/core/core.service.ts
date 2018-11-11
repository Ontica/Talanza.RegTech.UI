/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { ExceptionHandler } from './general/exception-handler';
import { HttpService } from './http/http.service';
import { LoggerService } from './general/logger.service';
import { SessionService } from './general/session.service';


@Injectable()
export class CoreService {

  constructor(private _exceptionHandler: ExceptionHandler,
              private _session: SessionService,
              private _http: HttpService,
              private _logger: LoggerService) { }


  get exceptionHandler(): ExceptionHandler {
    return this._exceptionHandler;
  }


  get http(): HttpService {
    return this._http;
  }


  get logger(): LoggerService {
    return this._logger;
  }


  get session(): SessionService {
    return this._session;
  }

}
