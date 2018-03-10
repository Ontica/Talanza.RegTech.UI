/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of'

import { Assertion } from 'empiria';
import { Exception } from '../general/exception';
import { ExceptionHandler } from '../general/exception-handler';

import { DirectoryService } from './directory.service';
import { HttpHandler } from './http-handler';

import { HttpClientOptions, HttpMethod } from './common-types';

@Injectable()
export class HttpService {

  constructor(private httpHandler: HttpHandler,
              private directory: DirectoryService,
              private exceptionHandler: ExceptionHandler) { }

  public get<T>(path: string, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.GET)
                         .mergeMap((service) => {
                            return this.httpHandler.get<T>(path, options, service);
                         });
  }

  public post<T>(path: string, body: any, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.POST)
                         .mergeMap((service) => {
                            return this.httpHandler.post<T>(path, body, options, service);
                         });
  }

  public put<T>(path: string, body: any, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.PUT)
                         .mergeMap((service) => {
                            return this.httpHandler.put<T>(path, body, options, service);
                         });
  }

  public delete<T>(path: string, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.DELETE)
                         .mergeMap((service) => {
                            return this.httpHandler.delete<T>(path, options, service);
                         });
  }

  public showAndReturn<T>(error: any, defaultMessage?: string, returnValue?: T): Observable<T> {
    let exception = Exception.convertTo(error, defaultMessage);

    exception.show();

    return Observable.of<T>(returnValue);
  }

  public showAndThrow(error: any, defaultMessage?: string) {
    const exception = Exception.convertTo(error, defaultMessage);

    exception.show();

    return Observable.throw(exception);
  }

}
