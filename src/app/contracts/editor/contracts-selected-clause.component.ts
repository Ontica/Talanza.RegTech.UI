/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { ContractsService } from '@app/services/regulation';

import {
  ContractClause, ContractClauseRef,
  EmptyContractClause, Rule
} from '@app/models/regulation';


@Component({
  selector: 'emp-gov-selected-clause',
  templateUrl: './contracts-selected-clause.component.html',
  styleUrls: ['./contracts-selected-clause.component.scss']
})
export class ContractsSelectedClauseComponent {

  procedureUID = '';
  isVisibleProcedureInfo = false;
  clauseInfoWidth = '100%';

  rules: Rule[] = [];

  clause: ContractClause = EmptyContractClause();

  constructor(private contractService: ContractsService) { }

  @Input()
  set clauseRef(clauseRef: ContractClauseRef) {
    if (clauseRef && clauseRef.uid !== '') {
      this.loadGridValues(clauseRef);
    }
  }


  onSelectedProcedure(procedureUID: string): void {
    this.isVisibleProcedureInfo = true;
    this.procedureUID = procedureUID;
  }


  onCloseProcedureInfoModal(): void {
    this.isVisibleProcedureInfo = false;
  }


  private loadGridValues(clauseRef: ContractClauseRef): void {
    this.loadClause(clauseRef);
    this.loadObligations(clauseRef);
  }


  private loadClause(clauseRef: ContractClauseRef): void {
    this.contractService.getClause(clauseRef.contractUID, clauseRef.uid)
      .toPromise()
      .then((x) => {
        this.clause = x;
      });
  }


  private loadObligations(clauseRef: ContractClauseRef): void {
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
