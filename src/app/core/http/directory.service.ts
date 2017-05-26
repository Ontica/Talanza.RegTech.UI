/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Assertion } from 'empiria';
import { HttpMethod } from './common-types';

@Injectable()
export class DirectoryService {

  private services: Observable<Service[]>;

  constructor(private http: Http) {
    this.services = this.getServices();
  }

  public getService(path: string, method?: HttpMethod): Observable<Service> {
    Assertion.assertValue(path, 'path');
    if (!method) {
      method = HttpMethod.GET;
    }

    return this.findService(path, method);
  }

  private findService(path: string, method: HttpMethod): Observable<Service> {
    return this.services.map((x) => x.find((item) => item.uid === path));
  }

  private getServices(): Observable<Service[]> {
    const options = this.getRequestOptions();

    return this.http.get('http://empiria.steps/api/v1/system/service-directory', options)
                    .map((response) => response.json()['data'] as Service[]);
  }

  private getRequestOptions(): RequestOptions {
    let requestOptions = new RequestOptions();
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    requestOptions.headers = headers;

    return requestOptions;
  }

}

export interface Service {

  readonly uid: string;

  readonly baseAddress: string;

  readonly path: string;

  readonly parameters: string[];

  readonly method: HttpMethod;

  readonly description: string;

  readonly isProtected: Boolean;

  readonly headers: string[];

  readonly payloadDataField: string;

  readonly payloadType: string;

  readonly responseDataType: string;

}
