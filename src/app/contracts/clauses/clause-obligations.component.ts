/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { ContractsService } from '@app/data-services/regulation';

import { ContractClauseRef, ContractObligation } from '@app/models/regulation';

@Component({
  selector: 'emp-gov-clause-obligations',
  templateUrl: './clause-obligations.component.html',
  styleUrls: ['./clause-obligations.component.scss']
})

export class ClauseObligationsComponent {

  procedureUID = '';
  isVisibleProcedureInfo = false;

  obligations: ContractObligation[] = [];

  constructor(private contractService: ContractsService) { }

  @Input()
  set clauseRef(clauseRef: ContractClauseRef) {
    if (clauseRef && clauseRef.uid !== '') {
      this.loadObligations(clauseRef);
    }
  }


  onSelectedProcedure(procedureUID: string): void {
    this.isVisibleProcedureInfo = true;
    this.procedureUID = procedureUID;
  }


  onCloseProcedureInfoModal(): void {
    this.isVisibleProcedureInfo = false;
  }


  private loadObligations(clauseRef: ContractClauseRef): void {
    this.contractService.getObligations(clauseRef.uid)
      .toPromise()
      .then((x) => this.obligations = x);
  }

}
