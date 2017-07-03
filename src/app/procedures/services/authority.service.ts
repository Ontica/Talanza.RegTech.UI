/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { Entity } from '../data-types/entity';

@Injectable()
export class AuthorityService {

  public constructor(private core: CoreService) { }

  private get HTTP_API_BASE_ADDRESS() {
    return this.core.appSettings.get<string>('HTTP_API_BASE_ADDRESS');
  }

  public getAuthorities(entityUID: string): Promise<Entity> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    return httpApiClient.getAsyncAsPromise('/v1/modeling/entities/' + entityUID);
  }

  public getEntities(): Promise<Entity[]> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    return httpApiClient.getAsyncAsPromise('/v1/modeling/entities');
  }

}
