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

  public getService(servicePathOrUID: string, method?: HttpMethod): Observable<Service> {
    Assertion.assertValue(servicePathOrUID, 'servicePathOrUID');

    if (servicePathOrUID.includes('http://') || servicePathOrUID.includes('https://') ) {
      return Observable.of<Service>(undefined);
    } else {
      return this.findService(servicePathOrUID, method);
    }
  }

  // Private methods

  private findService(servicePathOrUID: string, method: HttpMethod): Observable<Service> {
    let condition: (Service) => boolean;

    if (servicePathOrUID.includes('/') && method === undefined) {
      condition = (item: Service) => (item.path === servicePathOrUID);

    } else if (servicePathOrUID.includes('/') && method !== undefined) {
      condition = (item: Service) => (item.path === servicePathOrUID &&
                                      item.method.toString() === HttpMethod[method]);

    } else if (!servicePathOrUID.includes('/') && method === undefined) {
      condition = (item: Service) => (item.uid === servicePathOrUID);

    } else if (!servicePathOrUID.includes('/') && method !== undefined) {
      condition = (item: Service) => (item.uid === servicePathOrUID &&
                                      item.method.toString() === HttpMethod[method]);

    } else {
      throw Assertion.assertNoReachThisCode('A findService condition handler is missing in code.');
    }

    return this.services.map((x: Service[]) => {
      const filteredServices = x.filter((service) => condition(service));

      if (filteredServices.length === 0) {
        Assertion.assert(false, 'There are no services that satisfy the supplied search condition.');

      } else if (filteredServices.length > 1) {
        Assertion.assert(false,
                        `There are defined ${filteredServices.length} services that satisfy the ` +
                        'supplied search condition.');

      } else {
        return filteredServices[0];
      }
    });
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
