/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { CoreService } from '../../core/core.service';

import { Entity } from '../data-types/entity';

@Injectable()
export class AuthorityService {

  public constructor(private core: CoreService) { }

  public getEntity(entityUID: string): Promise<Entity> {
    return this.core.http.get<Entity>('v1/modeling/entities/' + entityUID)
                         .toPromise();
  }

  public getEntities(): Promise<Entity[]> {
    return this.core.http.get<Entity[]>('v1/modeling/entities')
                         .toPromise();
  }

}
