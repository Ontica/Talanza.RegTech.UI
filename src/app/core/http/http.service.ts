/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { Assertion } from 'empiria';

import { DirectoryService, Service } from './directory.service';
import { HttpHandler } from './http-handler';
import { HttpMethod } from './http-types';

@Injectable()
export class HttpService {

  private readonly httpHandler: HttpHandler;

  constructor(private http: Http, private directory: DirectoryService) {
    this.httpHandler = new HttpHandler(this.http);
  }

  public get<T>(path: string, options?: RequestOptionsArgs): Observable<T> {
    Assertion.assertValue(path, 'path');

    return this.directory.getService(path, HttpMethod.GET)
                         .mergeMap((service) => {
                            return this.httpHandler.get<T>(path, options, service);
                         });
  }

  // public post<T>(path: string, body: any, options?: RequestOptionsArgs): Observable<T> {
  //   Assertion.assertValue(path, 'path');

  //   const service = this.directory.getService(path, HttpMethod.POST);

  //   const handler = new HttpHandler(this.http);

  //   return handler.post<T>(path, body, options, service);
  // }

}
