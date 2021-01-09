/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { HttpService } from '@app/core';

import { KeyValue } from '@app/core/data-types';


@Injectable()
export class CataloguesService {

  constructor(private http: HttpService) {}

  getStartsWhenList(): Promise<KeyValue[]> {
    const path = 'v1/catalogues/procedure-starts-when';

    return this.http.get<KeyValue[]>(path)
                         .toPromise();
  }

  getTermTimeUnitsList(): Promise<KeyValue[]> {
    const path = 'v1/catalogues/term-time-units';

    return this.http.get<KeyValue[]>(path)
                         .toPromise();
  }

}
