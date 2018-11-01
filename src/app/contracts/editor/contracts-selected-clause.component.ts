/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';

import { CoreService } from '@app/core/core.service';

import { ContractsService } from '@app/services/regulation';

import { ContractClause, ContractClauseRef,
         EmptyContractClause, Rule } from '@app/models/regulation';


@Component({
  selector: 'selected-clause',
  templateUrl: './contracts-selected-clause.component.html',
  styleUrls: ['./contracts-selected-clause.component.scss'],
  providers: [ContractsService],
  encapsulation: ViewEncapsulation.Native,
})
export class ContractsSelectedClauseComponent {

  public procedureUID = "";
  public isVisibleProcedureInfo = false;
  public clauseInfoWidth = '100%';

  public rules: Rule[] = [];

  public clause: ContractClause = EmptyContractClause();

  constructor(private contractService: ContractsService) { }

  @Input()
  set clauseRef(clauseRef: ContractClauseRef) {
    if (clauseRef && clauseRef.uid != '') {
      this.loadGridValues(clauseRef);
    }
  }

  public onSelectedProcedure(procedureUID: string): void {
    this.isVisibleProcedureInfo = true;
    this.procedureUID = procedureUID;
  }

  public onCloseProcedureInfoModal(): void {
    this.isVisibleProcedureInfo = false;
  }

  private loadGridValues(clauseRef: ContractClauseRef): void {
    this.loadClause(clauseRef);
    this.loadObligations(clauseRef);
  }

  private loadClause(clauseRef: ContractClauseRef): void {
    const errMsg = 'Ocurrió un problema al intentar leer la cláusula.';

    this.contractService.getClause(clauseRef.contractUID, clauseRef.uid)
      .toPromise()
      .then((x) => {
      this.clause = x;
        this.setClauseInfoContainerWidth();
      });
  }

  private loadObligations(clauseRef: ContractClauseRef): void {
    const errMsg = 'Ocurrió un problema al intentar leer la cláusula.';

    this.contractService.getObligations(clauseRef.contractUID, clauseRef.uid)
      .toPromise()
      .then((x) => {
      this.rules = x.rules;
        this.setClauseInfoContainerWidth();
      });

  }

  private setClauseInfoContainerWidth(): void {

    if (this.rules.length > 0) {
      this.clauseInfoWidth = '50%';
      return;
    }
    if (this.clause.relatedProcedures.length === 0) {
      this.clauseInfoWidth = '100%';
    } else {
      this.clauseInfoWidth = '50%';
    }

  }

}
