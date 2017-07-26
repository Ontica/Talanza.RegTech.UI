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
import { Clause, RelatedProcedures } from '../data-types/clause';

@Injectable()
export class ContractService {

  public constructor(private core: CoreService) { }

  public getContractList(): Promise<BaseContract[]> {
    const path = 'v1/contracts';

    return this.core.http.get<BaseContract[]>(path).toPromise();
  }

  public getContractClausesList(contractUID: string): Promise<BaseClause[]> {
    const path = 'v1/contracts/' + contractUID + '/clauses';

    return this.core.http.get<BaseClause[]>(path).toPromise();
  }

  public getClause(contractUID: string, clauseUID: string): Promise<Clause> {
    const path = 'v1/contracts/' + contractUID + '/clauses/' + clauseUID;

    return this.core.http.get<Clause>(path).toPromise();
  }

  public createClause(contractUID: string, clause: Clause): Promise<Clause> {
    return this.core.http.post<Clause>('v1/contracts/' + contractUID + '/clauses', clause).toPromise();
  }

  public updateClause(contractUID: string, clause: Clause): Promise<Clause> {
    return this.core.http.put<Clause>('v1/contracts/' + contractUID + '/clauses/' + clause.uid, clause)
      .toPromise();
  }

  public addRelatedProcedure(contractUID: string, clauseUID: string,
                             relatedProcedure: RelatedProcedures): void {
    this.core.http.post('v1/contracts/' + contractUID + '/clauses/' + clauseUID + '/related-procedures',
      relatedProcedure).toPromise();
  }

}
