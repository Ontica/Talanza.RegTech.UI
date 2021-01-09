/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { Contract, ContractClause, ContractObligation } from '@app/models/regulation';


@Injectable()
export class ContractsService {

  constructor(private http: HttpService) { }

  getContractList(): Observable<Contract[]> {
    const path = 'v1/contracts';

    return this.http.get<Contract[]>(path);
  }

  getContractClausesList(contractUID: string): Observable<ContractClause[]> {
    const path = `v1/contracts/${contractUID}/clauses`;

    return this.http.get<ContractClause[]>(path);
  }

  searchClauses(contractUID: string, keywords: string): Observable<ContractClause[]> {
    const path = `v1/contracts/${contractUID}/clauses?keywords=${keywords}`;

    return this.http.get<ContractClause[]>(path);
  }

  getClause(contractUID: string, clauseUID: string): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses/${clauseUID}`;

    return this.http.get<ContractClause>(path);
  }

  createClause(contractUID: string, clause: ContractClause): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses`;

    return this.http.post<ContractClause>(path, clause);
  }

  updateClause(contractUID: string, clause: ContractClause): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses/${clause.uid}`;

    return this.http.put<ContractClause>(path, clause);
  }


  getObligations(legalItemUID: string): Observable<ContractObligation[]> {
    const path = `v3/empiria-steps/legal-data/${legalItemUID}/obligations`;

    return this.http.get<ContractObligation[]>(path);
  }

}
