/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { CoreService } from '@app/core/core.service';

import { ContractsService } from '@app/services/regulation';

import { ContractClauseRef, Rule } from '@app/models/regulation';

@Component({
  selector: 'emp-gov-clause-obligations',
  templateUrl: './clause-obligations.component.html',
  styleUrls: ['./clause-obligations.component.scss'],
  providers: [ContractsService]
})

export class ClauseObligationsComponent {

  procedureUID = '';
  isVisibleProcedureInfo = false;

  rules: Rule[] = [];

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
    this.contractService.getObligations(clauseRef.contractUID, clauseRef.uid).toPromise()
      .then((x) => this.rules = x.rules);
  }

}
