/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { CoreService } from '@app/core';

import { KeyValue } from '@app/models/core';


@Injectable()
export class CataloguesService {

  constructor(private core: CoreService) {}


  getStartsWhenList(): Promise<KeyValue[]> {
    const path = 'v1/catalogues/procedure-starts-when';

    return this.core.http.get<KeyValue[]>(path)
                         .toPromise();
  }


  getTermTimeUnitsList(): Promise<KeyValue[]> {
    const path = 'v1/catalogues/term-time-units';

    return this.core.http.get<KeyValue[]>(path)
                         .toPromise();
  }

}
