/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';

import { CoreService } from '../../core';

import { Contract, ContractClause, RelatedProcedures } from '../data-types/contract';

@Injectable()
export class ContractService {

  public constructor(private core: CoreService) { }

  public getContractList(): Promise<Contract[]> {
    const path = 'v1/contracts';

    return this.core.http.get<Contract[]>(path).toPromise();
  }

  public getContractClausesList(contractUID: string): Promise<ContractClause[]> {
    const path = 'v1/contracts/' + contractUID + '/clauses';

    return this.core.http.get<ContractClause[]>(path).toPromise();
  }

  public getClause(contractUID: string, clauseUID: string): Promise<ContractClause> {
    const path = 'v1/contracts/' + contractUID + '/clauses/' + clauseUID;

    return this.core.http.get<ContractClause>(path).toPromise();
  }

  public createClause(contractUID: string, clause: ContractClause): Promise<ContractClause> {
    return this.core.http.post<ContractClause>('v1/contracts/' + contractUID + '/clauses', clause).toPromise();
  }

  public updateClause(contractUID: string, clause: ContractClause): Promise<ContractClause> {
    return this.core.http.put<ContractClause>('v1/contracts/' + contractUID + '/clauses/' + clause.uid, clause)
      .toPromise();
  }

  public addRelatedProcedure(contractUID: string, clauseUID: string,
                             relatedProcedure: RelatedProcedures): void {
    this.core.http.post('v1/contracts/' + contractUID + '/clauses/' + clauseUID + '/related-procedures',
      relatedProcedure).toPromise();
  }

}
