/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { KeyValue } from '../../core/core-data-types';

@Injectable()
export class CataloguesService {

  public constructor(private core: CoreService) { }

  public getTimeValueTypesList(): Promise<KeyValue[]> {
    const path = 'v1/catalogues/time-value-types';

    return this.core.http.get<KeyValue[]>(path)
                         .toPromise();
  }

}
