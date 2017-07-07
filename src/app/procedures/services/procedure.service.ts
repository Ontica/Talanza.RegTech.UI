/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { Procedure } from '../data-types/procedure';
import { SmallProcedureInterface } from '../data-types/small-procedure.interface';

@Injectable()
export class ProcedureService {

  public constructor(private core: CoreService) { }

  private get HTTP_API_BASE_ADDRESS() {
    return this.core.appSettings.get<string>('HTTP_API_BASE_ADDRESS');
  }

  public getProocedures(): Promise<SmallProcedureInterface[]> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    return httpApiClient.getAsyncAsPromise('v1/procedures');
  }

  public getFilterProocedures(filter: string): Promise<SmallProcedureInterface[]> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    return httpApiClient.getAsyncAsPromise('v1/procedures?filter=' + filter);
  }

  public getProcuedure(uid: string): Promise<Procedure> {
     let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    return httpApiClient.getAsyncAsPromise('v1/procedures/' + uid);
  }

  public updateProcedure(procedure: Procedure): Promise<Procedure> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    httpApiClient.IncludeAuthorizationHeader = false;
    return httpApiClient.PutAsyncAsPromise<Procedure>(procedure,'v1/procedures/' + procedure.uid);
  }

  public createProcedure(procedure: Procedure): Promise<Procedure> {
    let httpApiClient = this.core.getHttpClient(this.HTTP_API_BASE_ADDRESS);
    httpApiClient.IncludeAuthorizationHeader = false;
    return httpApiClient.postAsyncAsPromise<Procedure>(procedure,'v1/procedures/');
  }

}
