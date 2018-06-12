/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Assertion } from '../general/assertion';
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
      .pipe(
        switchMap(service => this.httpHandler.get<T>(path, options, service))
      );
  }


  public post<T>(path: string, body: any, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.POST)
      .pipe(
        switchMap(service => this.httpHandler.post<T>(path, body, options, service))
      );
  }

  public put<T>(path: string, body: any, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.PUT)
        .pipe(
          switchMap(service => this.httpHandler.put<T>(path, body, options, service))
        );
  }

  public patch<T>(path: string, body: any, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.PATCH)
      .pipe(
        switchMap(service => this.httpHandler.patch<T>(path, body, options, service))
      );
  }

  public delete<T>(path: string, options?: HttpClientOptions): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.DELETE)
      .pipe(
        switchMap(service =>
          this.httpHandler.delete<T>(path, options, service))
      );
  }

  public showAndReturn<T>(error: any, defaultMessage?: string, returnValue?: T): Observable<T> {
    let exception = Exception.convertTo(error, defaultMessage);

    exception.show();

    return of<T>(returnValue);
  }

  public showAndThrow(error: any, defaultMessage?: string) : Observable<never> {
    const exception = Exception.convertTo(error, defaultMessage);

    exception.show();

    return throwError(exception);
  }

  public throw(error: any, defaultMessage?: string) : Observable<never> {
    const exception = Exception.convertTo(error, defaultMessage);

    return throwError(exception);
  }

}
