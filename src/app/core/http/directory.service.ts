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

import { HttpHandler } from './http-handler';
import { Service, HttpMethod } from './common-types';

@Injectable()
export class DirectoryService {

  private servicesList: Observable<Service[]>;

  constructor(private httpHandler: HttpHandler) {
    this.servicesList = this.getServicesList();
  }

  public getService(servicePathOrUID: string,
                    method?: HttpMethod): Observable<Service> {
    Assertion.assertValue(servicePathOrUID, 'servicePathOrUID');

    if (servicePathOrUID.includes('http://') || servicePathOrUID.includes('https://') ) {
      return Observable.of<Service>(undefined);
    } else {
      return this.getServiceFromList(servicePathOrUID, method);
    }
  }

  // Private methods

  private getServiceFromList(servicePathOrUID: string,
                             method: HttpMethod): Observable<Service> {
    let condition: (Service) => boolean;

    // if (servicePathOrUID.includes('/') && method === undefined) {
    //   condition = (service: Service) => (service.path === servicePathOrUID);

    // } else if (servicePathOrUID.includes('/') && method !== undefined) {
    //   condition = (service: Service) => (service.path === servicePathOrUID &&
    //                                      service.method.toString() === HttpMethod[method]);

    if (servicePathOrUID.includes('/')) {
      return Observable.of<Service>(undefined);

    } else if (!servicePathOrUID.includes('/') && method === undefined) {
      condition = (service: Service) => (service.uid === servicePathOrUID);

    } else if (!servicePathOrUID.includes('/') && method !== undefined) {
      condition = (service: Service) => (service.uid === servicePathOrUID &&
                                         service.method.toString() === HttpMethod[method]);

    } else {
      throw Assertion.assertNoReachThisCode('A findService condition handler is missing in code.');
    }

    return this.servicesList.map((x: Service[]) => {
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

  private getServicesList(): Observable<Service[]> {
    return this.httpHandler.get<Service[]>('v1/system/service-directory');
  }

}
