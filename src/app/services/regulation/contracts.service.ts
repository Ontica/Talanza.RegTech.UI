/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreService } from '@app/core/core.service';

import { Contract, ContractClause, RelatedProcedure, Obligation } from '@app/models/regulation';

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

  constructor(private core: CoreService) { }

  getContractList(): Observable<Contract[]> {
    const path = 'v1/contracts';

    return this.core.http.get<Contract[]>(path);
  }

  getContractClausesList(contractUID: string): Observable<ContractClause[]> {
    const path = `v1/contracts/${contractUID}/clauses`;

    return this.core.http.get<ContractClause[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, ContractServiceErr.GET_CLAUSES_ERR))
               );
  }

  searchClauses(contractUID: string, keywords: string): Observable<ContractClause[]> {
    const path = `v1/contracts/${contractUID}/clauses?keywords=${keywords}`;

    return this.core.http.get<ContractClause[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, ContractServiceErr.SEARCH_CLAUSES_ERR))
                );
  }

  getClause(contractUID: string, clauseUID: string): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses/${clauseUID}`;

    return this.core.http.get<ContractClause>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, ContractServiceErr.GET_CLAUSE_ERR))
               );
  }

  createClause(contractUID: string, clause: ContractClause): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses`;

    return this.core.http.post<ContractClause>(path, clause);
  }

  updateClause(contractUID: string, clause: ContractClause): Observable<ContractClause> {
    const path = `v1/contracts/${contractUID}/clauses/${clause.uid}`;

    return this.core.http.put<ContractClause>(path, clause);
  }

  addRelatedProcedure(contractUID: string, clauseUID: string,
                             relatedProcedure: RelatedProcedure): Observable<RelatedProcedure> {
    const path = `v1/contracts/${contractUID}/clauses/${clauseUID}/related-procedures`;

    return this.core.http.post<RelatedProcedure>(path, relatedProcedure);
  }

  getObligations(contractUID: string, clauseUID: string): Observable<Obligation> {
    const path = `v1/contracts/${contractUID}/clauses/${clauseUID}/rules`;

    return this.core.http.get<Obligation>(path);
  }

}
