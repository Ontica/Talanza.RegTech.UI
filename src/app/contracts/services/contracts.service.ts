/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core/core.service';

import { Contract, ContractClause, EmptyContractClause, 
         RelatedProcedure, Obligation } from '../data-types/contract';

export enum ContractServiceErr {
  GET_CLAUSE_ERR =
        '[GET_CLAUSE_ERR] No pude leer los datos de la cláusula del contrato.',
  GET_CLAUSES_ERR =
        '[GET_CLAUSES_ERR] Ocurrió un problema al leer las cláusulas del contrato.',
  SEARCH_CLAUSES_ERR =
        '[SEARCH_CLAUSES_ERR] Ocurrió un problema al buscar las cláusulas del contrato.',
}

@Injectable()
export class ContractsService {

  public constructor(private core: CoreService) { }

  public getContractList(): Observable<Contract[]> {
    const path = 'v1/contracts';

    return this.core.http.get<Contract[]>(path);
  }

  public getContractClausesList(contractUID: string): Observable<ContractClause[]> {
    const path = `v1/contracts/${contractUID}/clauses`;

    return this.core.http
                    .get<ContractClause[]>(path)
                    .catch((e) => this.core.http.showAndThrow(e, ContractServiceErr.GET_CLAUSES_ERR));
  }

  public searchClauses(contractUID: string, keywords: string): Observable<ContractClause[]> {
    const path = `v1/contracts/${contractUID}/clauses?keywords=${keywords}`;

    return this.core.http
                    .get<ContractClause[]>(path)
                    .catch((e) => this.core.http.showAndReturn(e, ContractServiceErr.SEARCH_CLAUSES_ERR,
                                                               null));
  }

  public getClause(contractUID: string, clauseUID: string): Observable<ContractClause> {    
    const path = `v1/contracts/${contractUID}/clauses/${clauseUID}`; 

    return this.core.http
                    .get<ContractClause>(path)
                    .catch((e) => this.core.http.showAndThrow(e, ContractServiceErr.GET_CLAUSE_ERR));
  }

  public createClause(contractUID: string, clause: ContractClause): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses`;

    return this.core.http
                    .post<ContractClause>(path, clause);
  }

  public updateClause(contractUID: string, clause: ContractClause): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses/${clause.uid}`;

    return this.core.http
                    .put<ContractClause>(path, clause);
  }

  public addRelatedProcedure(contractUID: string, clauseUID: string,
                             relatedProcedure: RelatedProcedure): Observable<RelatedProcedure> {
    const path = `v1/contracts/${contractUID}/clauses/${clauseUID}/related-procedures`;

    return this.core.http
                    .post<RelatedProcedure>(path, relatedProcedure);
  }

  public getObligations(contractUID: string, clauseUID: string): Observable<Obligation> {
    const path =`v1/contracts/${contractUID}/clauses/${clauseUID}/rules`;

    return this.core.http.get<Obligation>(path);
  }

}
