/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { BaseContract, BaseClause } from '../data-types/contract';

@Injectable()
export class ContractService {

  public constructor(private core: CoreService) { }

  public getContractList(): Promise<BaseContract[]> {
    const path = 'v1/legal-documents/contracts';

    return this.core.http.get<BaseContract[]>(path).toPromise();
  }

  public getContractClausesList(contractUID: string): Promise<BaseClause[]> {
    const path = 'v1/legal-documents/contracts/' + contractUID + '/clauses';

    return this.core.http.get<BaseClause[]>(path).toPromise();
  }

}
