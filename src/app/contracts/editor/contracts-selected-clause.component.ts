/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 import { Component, Input, ViewEncapsulation } from '@angular/core';

 import { Assertion } from 'empiria';
 import { CoreService } from '../../core';

 import { ContractsService } from '../services/contracts.service';

 import { Contract, ContractClause, ContractClauseRef,
          EmptyContractClause, RelatedProcedure } from '../data-types/contract';

 @Component({
   selector:'selected-clause',
   templateUrl: './contracts-selected-clause.component.html',
   styleUrls:['./contracts-selected-clause.component.scss'],
   providers: [ContractsService],
   encapsulation: ViewEncapsulation.Native,
 })

 export class ContractsSelectedClauseComponent {

  public procedureUID = "";
  public isVisibleProcedureInfo = false;
  public clauseInfoWidth = '100%';

  public clause: ContractClause = EmptyContractClause();

  constructor(private core: CoreService, private contractService: ContractsService) { }

  @Input()
  set clauseRef(clauseRef: ContractClauseRef) {
    if (clauseRef && clauseRef.uid != '') {
      this.loadClause(clauseRef);
    }
  }

  public onSelectedProcedure(procedureUID: string): void {
    this.isVisibleProcedureInfo = true;
    this.procedureUID = procedureUID;
  }

  public onCloseProcedureInfoModal(): void {
    this.isVisibleProcedureInfo = false;
  }

  private loadClause(clauseRef: ContractClauseRef): void {
    const errMsg = 'Ocurrió un problema al intentar leer la cláusula.';

    this.contractService.getClause(clauseRef.contractUID, clauseRef.uid)
                        .toPromise()
                        .then((x) => { this.clause = x;
                                       this.setClauseInfoContainerWidth();
                                     })
                        .catch((e) => this.core.http.showAndThrow(e, errMsg));
  }

  private setClauseInfoContainerWidth(): void {
    if (this.clause.relatedProcedures.length === 0) {
      this.clauseInfoWidth = '100%';
    } else {
      this.clauseInfoWidth = '50%';
    }
  }
 }
